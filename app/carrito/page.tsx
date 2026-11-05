"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { ProductImage } from "@/components/ProductImage";
import { ShippingCalculator } from "@/components/ShippingCalculator";
import { getProduct } from "@/lib/products";
import { money } from "@/lib/format";
import { STORE } from "@/lib/config";

export default function Carrito() {
  const { items, ready, subtotal, setQty, remove } = useCart();

  return (
    <div className="light">
      <div className="wrap" style={{ paddingTop: 48 }}>
        <h1 className="display h2">Tu carrito</h1>
      </div>
      {!ready ? (
        <div className="wrap" style={{ padding: "48px var(--gutter) 112px" }}>Cargando…</div>
      ) : items.length === 0 ? (
        <div className="wrap" style={{ paddingTop: 32, paddingBottom: 112, display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
          <p style={{ margin: 0, fontSize: 18 }}>Todavía no agregaste productos.</p>
          <Link className="btn btn-dark" href="/tienda">Ver la colección</Link>
        </div>
      ) : (
        <div className="wrap checkout">
          <div className="main" style={{ gap: 0 }}>
            {items.map((it, i) => {
              const p = getProduct(it.slug)!;
              const hex = p.colors.find((c) => c.name === it.color)?.hex;
              return (
                <div className="cart-row" key={`${it.slug}-${it.size}-${it.color}`}>
                  <Link href={`/producto/${p.slug}`} aria-label={p.name}>
                    <ProductImage product={p} colorHex={hex} showName={false} />
                  </Link>
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 6 }}>
                    <Link href={`/producto/${p.slug}`} style={{ color: "inherit", textDecoration: "none", fontSize: 18 }}>{p.name}</Link>
                    <span style={{ fontSize: 14, color: "var(--muted-dark)" }}>Talle {it.size} · {it.color}</span>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center", marginTop: "auto" }}>
                      <div className="qty">
                        <button aria-label="Restar uno" onClick={() => setQty(i, it.quantity - 1)}>−</button>
                        <output aria-label="Cantidad">{it.quantity}</output>
                        <button aria-label="Sumar uno" onClick={() => setQty(i, it.quantity + 1)}>+</button>
                      </div>
                      <button className="link-btn" onClick={() => remove(i)}>Quitar</button>
                    </div>
                  </div>
                  <span style={{ fontSize: 17, fontWeight: 500, whiteSpace: "nowrap" }}>{money(p.price * it.quantity)}</span>
                </div>
              );
            })}
            <Link href="/tienda" style={{ marginTop: 24, fontSize: 15 }}>← Seguir comprando</Link>
          </div>

          <aside className="summary">
            <h2 className="display" style={{ fontSize: 32 }}>Resumen</h2>
            <dl className="totals">
              <dt>Subtotal</dt>
              <dd>{money(subtotal)}</dd>
              <dt>Por transferencia</dt>
              <dd>{money(subtotal * (1 - STORE.transferDiscount))}</dd>
            </dl>
            {subtotal < STORE.freeShippingFrom ? (
              <p style={{ margin: 0, fontSize: 14, color: "var(--muted-2)" }}>
                Te faltan {money(STORE.freeShippingFrom - subtotal)} para el <b style={{ color: "var(--ivory)" }}>envío gratis</b>.
              </p>
            ) : (
              <p style={{ margin: 0, fontSize: 14, color: "var(--brass-text)" }}>¡Tu compra tiene envío gratis!</p>
            )}
            <ShippingCalculator items={items} />
            <Link className="btn btn-gold btn-block" href="/checkout" style={{ minHeight: 58 }}>Finalizar compra</Link>
            <span style={{ fontSize: 13, color: "var(--muted)" }}>
              {STORE.installments} cuotas sin interés de {money(subtotal / STORE.installments)}
            </span>
          </aside>
        </div>
      )}
    </div>
  );
}
