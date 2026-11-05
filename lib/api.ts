// Llamadas del navegador. En la versión estática (GitHub Pages) no hay API:
// se usa la misma lógica directamente en el navegador.
import { IS_STATIC } from "./asset";
import type { CartItem } from "./order";
import type { Body, CheckoutResult } from "./checkout";
import type { ShippingQuote } from "./shipping";

export async function getQuotes(cp: string, items: CartItem[], signal?: AbortSignal): Promise<ShippingQuote[]> {
  if (!/^\d{4}$/.test(cp)) throw new Error("Ingresá un código postal de 4 números.");
  if (IS_STATIC) {
    const { quoteCart } = await import("./shipping");
    return quoteCart(cp, items);
  }
  const res = await fetch("/api/envio", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cp, items }),
    signal,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "No pudimos calcular el envío.");
  return data.quotes;
}

export async function postCheckout(body: Body): Promise<CheckoutResult> {
  if (IS_STATIC) {
    const { processCheckout } = await import("./checkout");
    return processCheckout(body);
  }
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return { status: res.status, data: await res.json() };
}
