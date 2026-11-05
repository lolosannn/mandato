import { NextResponse } from "next/server";
import { isValidCP, quoteCart } from "@/lib/shipping";
import type { CartItem } from "@/lib/order";

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
  return NextResponse.json({ quotes: await quoteCart(cp, body.items ?? []) });
}
