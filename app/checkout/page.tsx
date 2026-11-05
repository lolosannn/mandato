"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { ProductImage } from "@/components/ProductImage";
import { LockIcon, ShieldIcon, SwapIcon, TruckIcon } from "@/components/Icons";
import { getProduct } from "@/lib/products";
import { money } from "@/lib/format";
import { STORE } from "@/lib/config";
import type { ShippingMethod, ShippingQuote } from "@/lib/shipping";
import { getQuotes, postCheckout } from "@/lib/api";
import { IS_STATIC } from "@/lib/asset";

export default function Checkout() {
  const { items, ready, subtotal } = useCart();
  const router = useRouter();

  const [method, setMethod] = useState<ShippingMethod>("retiro");
  const [payment, setPayment] = useState<"mercadopago" | "transferencia">(IS_STATIC ? "transferencia" : "mercadopago");
  const [cp, setCp] = useState("");
  const [quotes, setQuotes] = useState<ShippingQuote[] | null>(null);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  // Cotiza Andreani cuando el CP está completo
  useEffect(() => {
    if (!/^\d{4}$/.test(cp) || !items.length) {
      setQuotes(null);
      return;
    }
    const ctrl = new AbortController();
    getQuotes(cp, items, ctrl.signal)
      .then(setQuotes)
      .catch(() => {});
    return () => ctrl.abort();
  }, [cp, items]);

  const quote = method === "retiro" ? { title: "Retiro en el local", price: 0 } : quotes?.find((q) => q.method === method);
  const shipPrice = quote?.price ?? 0;
  const itemsTotal = payment === "transferencia" ? Math.round(subtotal * (1 - STORE.transferDiscount)) : subtotal;
  const total = itemsTotal + shipPrice;
  const shipPending = method !== "retiro" && !quote;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    setSending(true);
    try {
      const { status, data } = await postCheckout({
        items,
        customer: { email: get("email"), name: get("name"), phone: get("phone"), dni: get("dni") },
        shipping: { method, cp, street: get("street"), city: get("city"), province: get("province"), notes: get("notes") },
        payment,
      });
      if (status !== 200) throw new Error(String(data.error || "No pudimos procesar tu pedido."));
      if (data.kind === "mercadopago" && data.redirect) {
        window.location.href = String(data.redirect);
        return;
      }
      sessionStorage.setItem("mandato-last-order", JSON.stringify({ ...data, customer: get("name") }));
      router.push(`/checkout/resultado?estado=transferencia&pedido=${data.orderId}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos procesar tu pedido.");
      setSending(false);
    }
  }

  if (ready && items.length === 0) {
    return (
      <div className="light">
        <div className="wrap" style={{ paddingTop: 64, paddingBottom: 112, display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
          <h1 className="display h2">Finalizar compra</h1>
          <p style={{ margin: 0, fontSize: 18 }}>Tu carrito está vacío.</p>
          <Link className="btn btn-dark" href="/tienda">Ver la colección</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="light">
      <div className="wrap" style={{ paddingTop: 40, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-end", gap: 16 }}>
        <h1 className="display h2">Finalizar compra</h1>
        <span className="caps" style={{ fontSize: 12, display: "flex", alignItems: "center", gap: 8, color: "var(--muted-dark)" }}>
          <LockIcon /> Compra 100% segura
        </span>
      </div>

      <div className="wrap checkout">
        <form id="checkout" onSubmit={submit} noValidate={false}>
          <fieldset>
            <legend>1 · Tus datos</legend>
            <div className="form-grid">
              <label className="field full">Email<input className="input" name="email" type="email" autoComplete="email" required /></label>
              <label className="field">Nombre y apellido<input className="input" name="name" autoComplete="name" required /></label>
              <label className="field">Teléfono / WhatsApp<input className="input" name="phone" type="tel" autoComplete="tel" required /></label>
              <label className="field">DNI<input className="input" name="dni" inputMode="numeric" required={method !== "retiro"} /></label>
            </div>
          </fieldset>

          <fieldset>
            <legend>2 · Entrega</legend>
            <label className="option">
              <input type="radio" name="ship" checked={method === "retiro"} onChange={() => setMethod("retiro")} />
              <span className="grow"><span className="title">Retiro en el local</span><span className="sub">{STORE.address} · Te avisamos cuando esté listo</span></span>
              <span className="title">Gratis</span>
            </label>
            <label className="option">
              <input type="radio" name="ship" checked={method === "domicilio"} onChange={() => setMethod("domicilio")} />
              <span className="grow"><span className="title">Andreani a domicilio</span><span className="sub">{quotes?.find((q) => q.method === "domicilio")?.description ?? "Ingresá tu código postal para cotizar"}</span></span>
              <span className="title">{priceLabel(quotes, "domicilio")}</span>
            </label>
            <label className="option">
              <input type="radio" name="ship" checked={method === "sucursal"} onChange={() => setMethod("sucursal")} />
              <span className="grow"><span className="title">Andreani a sucursal</span><span className="sub">Retirás en la sucursal Andreani más cercana</span></span>
              <span className="title">{priceLabel(quotes, "sucursal")}</span>
            </label>
            {method !== "retiro" && (
              <div className="form-grid" style={{ paddingTop: 8 }}>
                <label className="field">Código postal
                  <input className="input" name="cp" inputMode="numeric" maxLength={4} autoComplete="postal-code" required value={cp} onChange={(e) => setCp(e.target.value.replace(/\D/g, ""))} />
                </label>
                <label className="field">Localidad<input className="input" name="city" autoComplete="address-level2" required={method === "domicilio"} /></label>
                <label className="field">Provincia<input className="input" name="province" autoComplete="address-level1" defaultValue="Buenos Aires" /></label>
                {method === "domicilio" && (
                  <label className="field full">Calle, número, piso y depto.<input className="input" name="street" autoComplete="street-address" required /></label>
                )}
                <label className="field full">Notas para la entrega (opcional)<input className="input" name="notes" /></label>
              </div>
            )}
          </fieldset>

          <fieldset>
            <legend>3 · Pago</legend>
            <label className="option">
              <input type="radio" name="pay" checked={payment === "mercadopago"} onChange={() => setPayment("mercadopago")} disabled={IS_STATIC} />
              <span className="grow">
                <span className="title">Tarjeta de crédito, débito o Mercado Pago</span>
                <span className="sub">
                  {IS_STATIC
                    ? "Disponible cuando la tienda se publique con servidor (versión de vista previa)."
                    : `Hasta ${STORE.installments} cuotas sin interés. Pagás en el entorno seguro de Mercado Pago.`}
                </span>
              </span>
            </label>
            <label className="option">
              <input type="radio" name="pay" checked={payment === "transferencia"} onChange={() => setPayment("transferencia")} />
              <span className="grow">
                <span className="title">Transferencia bancaria · {Math.round(STORE.transferDiscount * 100)}% off</span>
                <span className="sub">Te mostramos los datos al confirmar y nos mandás el comprobante por WhatsApp.</span>
              </span>
            </label>
          </fieldset>
        </form>

        <aside className="summary">
          <h2 className="display" style={{ fontSize: 32 }}>Tu pedido</h2>
          {items.map((it) => {
            const p = getProduct(it.slug)!;
            return (
              <div className="summary-line" key={`${it.slug}-${it.size}-${it.color}`}>
                <ProductImage product={p} colorHex={p.colors.find((c) => c.name === it.color)?.hex} showName={false} />
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, fontSize: 15 }}>
                  <span>{p.name}</span>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>Talle {it.size} · {it.color} · ×{it.quantity}</span>
                  <span style={{ marginTop: "auto" }}>{money(p.price * it.quantity)}</span>
                </div>
              </div>
            );
          })}
          <Link href="/carrito" style={{ fontSize: 14 }}>Editar carrito</Link>
          <dl className="totals">
            <dt>Subtotal</dt>
            <dd>{money(subtotal)}</dd>
            {payment === "transferencia" && (
              <>
                <dt>Descuento transferencia</dt>
                <dd>− {money(subtotal - itemsTotal)}</dd>
              </>
            )}
            <dt>Envío</dt>
            <dd>{shipPending ? "A calcular" : shipPrice === 0 ? "Gratis" : money(shipPrice)}</dd>
            <dt className="total">Total</dt>
            <dd className="total">{money(total)}</dd>
          </dl>
          {error && <p className="error" role="alert" style={{ margin: 0 }}>{error}</p>}
          <button className="btn btn-gold btn-block" form="checkout" disabled={sending || shipPending || !ready} style={{ minHeight: 58 }}>
            {sending ? "Procesando…" : payment === "mercadopago" ? `Pagar ${money(total)}` : "Confirmar pedido"}
          </button>
          <ul className="trust">
            <li><ShieldIcon size={18} />Pago encriptado y protegido por Mercado Pago</li>
            <li><TruckIcon size={18} />Seguimiento de envío Andreani por email</li>
            <li><SwapIcon />Cambio de talle sin cargo en el local</li>
          </ul>
        </aside>
      </div>
    </div>
  );
}

function priceLabel(quotes: ShippingQuote[] | null, m: ShippingMethod) {
  const q = quotes?.find((x) => x.method === m);
  if (!q) return "—";
  return q.price === 0 ? "Gratis" : money(q.price);
}
