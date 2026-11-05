"use client";

import { useState } from "react";
import { money } from "@/lib/format";
import type { ShippingQuote } from "@/lib/shipping";
import type { CartItem } from "@/lib/order";
import { TruckIcon } from "./Icons";
import { getQuotes } from "@/lib/api";

export function ShippingCalculator({ items }: { items: CartItem[] }) {
  const [cp, setCp] = useState("");
  const [quotes, setQuotes] = useState<ShippingQuote[] | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function calc(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!/^\d{4}$/.test(cp)) {
      setError("Ingresá un código postal de 4 números.");
      return;
    }
    setLoading(true);
    try {
      setQuotes(await getQuotes(cp, items));
    } catch (err) {
      setError(err instanceof Error ? err.message : "No pudimos calcular el envío.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className="panel" onSubmit={calc}>
      <label htmlFor="cp-calc" className="caps" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13 }}>
        <span style={{ color: "var(--brass-text)" }}><TruckIcon size={22} /></span>
        Calculá tu envío con Andreani
      </label>
      <div className="inline-form">
        <input id="cp-calc" className="input" inputMode="numeric" maxLength={4} placeholder="Código postal" value={cp} onChange={(e) => setCp(e.target.value.replace(/\D/g, ""))} />
        <button className="btn btn-ivory" disabled={loading}>{loading ? "…" : "Calcular"}</button>
      </div>
      {error && <p className="error" role="alert" style={{ margin: 0 }}>{error}</p>}
      {quotes && (
        <ul className="quote-list" aria-live="polite">
          {quotes.map((q) => (
            <li key={q.method}>
              <span>{q.title}<small>{q.description}</small></span>
              <span style={{ color: q.price === 0 ? "var(--brass-text)" : undefined, whiteSpace: "nowrap" }}>{q.price === 0 ? "Gratis" : money(q.price)}</span>
            </li>
          ))}
        </ul>
      )}
      <a href="https://www.andreani.com/#!/informacionEnvio" target="_blank" rel="noopener" style={{ fontSize: 13 }}>
        ¿No sabés tu código postal?
      </a>
    </form>
  );
}
