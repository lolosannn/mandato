import { NextResponse } from "next/server";
import { processCheckout, type Body } from "@/lib/checkout";

export async function POST(req: Request) {
  let body: Body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Pedido inválido." }, { status: 400 });
  }
  const { status, data } = await processCheckout(body);
  return NextResponse.json(data, { status });
}
