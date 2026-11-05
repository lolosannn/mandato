"use client";

import { useSearchParams } from "next/navigation";
import { getProduct } from "@/lib/products";
import { Booking } from "./Booking";

export function BookingFromUrl() {
  const params = useSearchParams();
  const product = getProduct(params.get("producto") ?? "");
  return <Booking key={params.get("servicio") ?? ""} initialService={params.get("servicio") ?? undefined} productName={product?.name} />;
}
