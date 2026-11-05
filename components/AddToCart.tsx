"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCart } from "./CartProvider";
import { ProductImage } from "./ProductImage";
import { ShippingCalculator } from "./ShippingCalculator";
import { CalendarIcon } from "./Icons";
import { STORE } from "@/lib/config";

// Galería + selector de color/talle/cantidad + carrito, sincronizados por el color elegido.
export function ProductBuy({ product, children }: { product: Product; children: React.ReactNode }) {
  const { add } = useCart();
  const [color, setColor] = useState(product.colors[0]);
  const firstAvailable = product.sizes.length === 1 ? product.sizes[0] : "";
  const [size, setSize] = useState(firstAvailable);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const [photo, setPhoto] = useState(0);

  function onAdd() {
    if (!size) {
      setError("Elegí tu talle para continuar.");
      return;
    }
    setError("");
    add({ slug: product.slug, size, color: color.name, quantity: qty });
  }

  const thumbs = product.images.length > 1 ? product.images : [];

  return (
    <div className="pdp">
      <div className="pdp-gallery" style={{ display: "flex", gap: 12 }}>
        {thumbs.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12, width: 80, flexShrink: 0 }}>
            {thumbs.map((src, i) => (
              <button key={src} onClick={() => setPhoto(i)} aria-label={`Ver foto ${i + 1}`} style={{ padding: 0, border: `1px solid ${i === photo ? "var(--brass-text)" : "var(--line)"}`, background: "none", cursor: "pointer" }}>
                <img src={src} alt="" style={{ aspectRatio: "3 / 4", objectFit: "cover", width: "100%" }} />
              </button>
            ))}
          </div>
        )}
        <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
          {product.tag && <span className={`tag${product.tag === "Oferta" ? " red" : ""}`}>{product.tag}</span>}
          <ProductImage product={product} index={photo} colorHex={color.hex} priority />
        </div>
      </div>

      <div className="pdp-info">
        {children}

        {product.colors.length > 0 && (
          <fieldset>
            <legend style={{ fontSize: 13 }}>
              Color: <span style={{ color: "var(--brass-text)" }}>{color.name}</span>
            </legend>
            <div className="swatches">
              {product.colors.map((c) => (
                <button key={c.name} type="button" className="swatch" aria-label={c.name} aria-pressed={c.name === color.name} onClick={() => setColor(c)}>
                  <span style={{ background: c.hex }} />
                </button>
              ))}
            </div>
          </fieldset>
        )}

        <fieldset>
          <legend style={{ fontSize: 13, display: "flex", gap: 16 }}>
            Talle {product.sizes.length > 1 && <Link href="/ayuda#talles" style={{ textTransform: "none", letterSpacing: 0 }}>Guía de talles</Link>}
          </legend>
          <div className="sizes">
            {product.sizes.map((s) => {
              const off = product.soldOut?.includes(s);
              return (
                <button key={s} type="button" className="size" disabled={off} aria-pressed={s === size} onClick={() => { setSize(s); setError(""); }} aria-label={off ? `Talle ${s}, sin stock` : `Talle ${s}`}>
                  {s}
                </button>
              );
            })}
          </div>
          {error && <p className="error" role="alert" style={{ margin: "10px 0 0" }}>{error}</p>}
        </fieldset>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <div className="qty">
            <button type="button" aria-label="Restar uno" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
            <output aria-live="polite" aria-label="Cantidad">{qty}</output>
            <button type="button" aria-label="Sumar uno" onClick={() => setQty((q) => Math.min(10, q + 1))}>+</button>
          </div>
          <button type="button" className="btn btn-gold" style={{ flex: "1 1 220px" }} onClick={onAdd}>
            Agregar al carrito
          </button>
        </div>
        <Link className="btn btn-line" href={`/turnos?servicio=${product.rentalPrice ? "alquiler" : "asesoramiento"}&producto=${product.slug}`}>
          <CalendarIcon /> Probármelo en el local
        </Link>

        <ShippingCalculator items={[{ slug: product.slug, size: size || product.sizes[0], color: color.name, quantity: qty }]} />

        <div style={{ borderTop: "1px solid var(--line)" }}>
          <details className="acc" open>
            <summary>Descripción</summary>
            <p>{product.description}</p>
          </details>
          <details className="acc">
            <summary>Detalles y cuidados</summary>
            <ul>{product.details.map((d) => <li key={d}>{d}</li>)}</ul>
          </details>
          <details className="acc">
            <summary>Cambios y devoluciones</summary>
            <p>
              Tenés {STORE.exchangeDays} días para cambiar talle o color en el local o por envío. <Link href="/ayuda#cambios">Ver condiciones</Link>.
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
