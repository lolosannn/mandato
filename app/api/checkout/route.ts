import { NextResponse } from "next/server";
import { SITE_URL, STORE } from "@/lib/config";
import { newOrderId, priceCart, subtotal as sumLines, transferPrice, type CartItem } from "@/lib/order";
import { isValidCP, quoteShipping, type ShippingMethod } from "@/lib/shipping";

type Body = {
  items: CartItem[];
  customer: { email: string; name: string; phone: string; dni: string };
  shipping: { method: ShippingMethod; cp?: string; street?: string; city?: string; province?: string; notes?: string };
  payment: "mercadopago" | "transferencia";
};

function bad(msg: string, status = 400) {
  return NextResponse.json({ error: msg }, { status });
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return bad("Pedido inválido.");
  }

  const lines = priceCart(Array.isArray(body.items) ? body.items : []);
  if (!lines.length) return bad("Tu carrito está vacío.");

  const c = body.customer ?? ({} as Body["customer"]);
  if (!/^\S+@\S+\.\S+$/.test(c.email ?? "")) return bad("Revisá tu email.");
  if (!c.name?.trim()) return bad("Completá tu nombre y apellido.");
  if (!c.phone?.trim()) return bad("Completá tu teléfono.");

  const s = body.shipping ?? ({ method: "retiro" } as Body["shipping"]);
  if (!["domicilio", "sucursal", "retiro"].includes(s.method)) return bad("Elegí una forma de entrega.");
  if (s.method !== "retiro") {
    if (!isValidCP(s.cp ?? "")) return bad("Ingresá un código postal válido.");
    if (!c.dni?.trim()) return bad("Andreani necesita tu DNI para el envío.");
    if (s.method === "domicilio" && (!s.street?.trim() || !s.city?.trim())) return bad("Completá tu dirección.");
  }

  // Envío recalculado en el servidor
  const quotes = await quoteShipping(
    s.method === "retiro" ? process.env.ANDREANI_CP_ORIGEN || "1842" : s.cp!,
    lines.map((l) => ({ weightKg: l.product.weightKg, price: l.unitPrice, quantity: l.quantity })),
  );
  const ship = quotes.find((q) => q.method === s.method)!;
  const itemsTotal = sumLines(lines);
  const orderId = newOrderId();

  if (body.payment === "transferencia") {
    const total = transferPrice(itemsTotal) + ship.price;
    return NextResponse.json({
      kind: "transferencia",
      orderId,
      total,
      shipping: ship.title,
      summary: lines.map((l) => `${l.quantity}× ${l.product.name} (T${l.size}, ${l.color})`),
      bank: {
        alias: process.env.TRANSFER_ALIAS || "",
        cbu: process.env.TRANSFER_CBU || "",
        holder: process.env.TRANSFER_TITULAR || "",
      },
    });
  }

  const token = process.env.MP_ACCESS_TOKEN;
  if (!token) {
    return bad("El pago online todavía no está habilitado. Elegí transferencia o escribinos por WhatsApp.", 503);
  }

  const https = SITE_URL.startsWith("https://");
  const [first, ...rest] = c.name.trim().split(/\s+/);
  const preference = {
    items: [
      ...lines.map((l) => ({
        id: l.product.slug,
        title: `${l.product.name} · Talle ${l.size} · ${l.color}`,
        quantity: l.quantity,
        unit_price: l.unitPrice,
        currency_id: "ARS",
        category_id: "fashion",
      })),
      ...(ship.price > 0
        ? [{ id: "envio", title: ship.title, quantity: 1, unit_price: ship.price, currency_id: "ARS" }]
        : []),
    ],
    payer: {
      name: first,
      surname: rest.join(" "),
      email: c.email,
      phone: { number: c.phone },
      identification: c.dni ? { type: "DNI", number: c.dni } : undefined,
    },
    external_reference: orderId,
    statement_descriptor: "MANDATO",
    payment_methods: { installments: 12 },
    back_urls: {
      success: `${SITE_URL}/checkout/resultado?estado=aprobado&pedido=${orderId}`,
      pending: `${SITE_URL}/checkout/resultado?estado=pendiente&pedido=${orderId}`,
      failure: `${SITE_URL}/checkout/resultado?estado=rechazado&pedido=${orderId}`,
    },
    ...(https ? { auto_return: "approved", notification_url: `${SITE_URL}/api/mercadopago/webhook` } : {}),
    metadata: {
      order_id: orderId,
      customer: c,
      shipping: { ...s, title: ship.title, price: ship.price },
    },
  };

  try {
    const res = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", "X-Idempotency-Key": orderId },
      body: JSON.stringify(preference),
    });
    const data = await res.json();
    if (!res.ok) {
      console.error("Mercado Pago error", res.status, data);
      return bad("No pudimos iniciar el pago. Probá de nuevo en unos minutos.", 502);
    }
    const url = token.startsWith("TEST-") ? data.sandbox_init_point || data.init_point : data.init_point;
    return NextResponse.json({ kind: "mercadopago", orderId, redirect: url });
  } catch (err) {
    console.error("Mercado Pago fetch error", err);
    return bad("No pudimos conectar con Mercado Pago. Probá de nuevo.", 502);
  }
}
