import { STORE } from "./config";
import { getProduct, type Product } from "./products";

export type CartItem = {
  slug: string;
  size: string;
  color: string;
  quantity: number;
};

export type PricedLine = CartItem & { product: Product; unitPrice: number; lineTotal: number };

// Valida el carrito contra el catálogo: los precios siempre salen del servidor.
export function priceCart(items: CartItem[]): PricedLine[] {
  const lines: PricedLine[] = [];
  for (const item of items) {
    const product = getProduct(item.slug);
    if (!product) continue;
    if (!product.sizes.includes(item.size) || product.soldOut?.includes(item.size)) continue;
    if (!product.colors.some((c) => c.name === item.color)) continue;
    const quantity = Math.min(10, Math.max(1, Math.floor(Number(item.quantity) || 1)));
    lines.push({ ...item, quantity, product, unitPrice: product.price, lineTotal: product.price * quantity });
  }
  return lines;
}

export function subtotal(lines: { lineTotal: number }[]) {
  return lines.reduce((s, l) => s + l.lineTotal, 0);
}

export function transferPrice(amount: number) {
  return Math.round(amount * (1 - STORE.transferDiscount));
}

export function newOrderId() {
  const d = new Date();
  const ymd = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  return `MDT-${ymd}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
}
