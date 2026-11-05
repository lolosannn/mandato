import { NextResponse } from "next/server";
import { isValidCP, quoteShipping } from "@/lib/shipping";
import { priceCart, type CartItem } from "@/lib/order";

export async function POST(req: Request) {
  let body: { cp?: string; items?: CartItem[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }
  const cp = String(body.cp ?? "").trim();
  if (!isValidCP(cp)) {
    return NextResponse.json({ error: "Ingresá un código postal de 4 números." }, { status: 400 });
  }
  const lines = priceCart(Array.isArray(body.items) ? body.items : []);
  const items = lines.length
    ? lines.map((l) => ({ weightKg: l.product.weightKg, price: l.unitPrice, quantity: l.quantity }))
    : [{ weightKg: 1.5, price: 0, quantity: 1 }];
  const quotes = await quoteShipping(cp, items);
  return NextResponse.json({ quotes });
}
