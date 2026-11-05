import { NextResponse } from "next/server";

// Notificaciones de Mercado Pago. Consulta el pago y deja registro en los logs del servidor.
// Cuando haya base de datos o email, acá se marca el pedido como pagado y se avisa al local.
export async function POST(req: Request) {
  const token = process.env.MP_ACCESS_TOKEN;
  const url = new URL(req.url);
  let body: { type?: string; data?: { id?: string } } = {};
  try {
    body = await req.json();
  } catch {}

  const type = body.type ?? url.searchParams.get("type") ?? url.searchParams.get("topic");
  const id = body.data?.id ?? url.searchParams.get("data.id") ?? url.searchParams.get("id");

  if (type === "payment" && id && token) {
    try {
      const res = await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(id)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const p = await res.json();
      console.log("[MP] pago", {
        id: p.id,
        estado: p.status,
        detalle: p.status_detail,
        pedido: p.external_reference,
        total: p.transaction_amount,
        email: p.payer?.email,
      });
    } catch (err) {
      console.error("[MP] error consultando pago", err);
    }
  }

  return NextResponse.json({ ok: true });
}
