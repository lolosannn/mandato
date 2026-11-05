import type { Metadata } from "next";
import { Suspense } from "react";
import { TiendaView } from "@/components/TiendaView";

export const metadata: Metadata = {
  title: "Tienda",
  description: "Trajes, sacos, camisas y accesorios de moda masculina premium. Envíos a todo el país.",
};

export default function Tienda() {
  return (
    <Suspense fallback={<div className="section" />}>
      <TiendaView />
    </Suspense>
  );
}
