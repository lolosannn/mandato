import type { Metadata } from "next";
import { Booking } from "@/components/Booking";
import { getProduct } from "@/lib/products";
import { STORE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Sacar turno",
  description: `Reservá tu turno de asesoramiento, alquiler o sastrería en ${STORE.address}.`,
};

export default async function Turnos({ searchParams }: { searchParams: Promise<{ servicio?: string; producto?: string }> }) {
  const { servicio, producto } = await searchParams;
  const product = producto ? getProduct(producto) : undefined;

  return (
    <>
      <section className="wrap" style={{ paddingTop: "clamp(48px, 6vw, 88px)", paddingBottom: 40, display: "flex", flexDirection: "column", gap: 16 }}>
        <p className="eyebrow">Atención personalizada</p>
        <h1 className="display h1" style={{ maxWidth: 900 }}>
          Reservá tu turno. <em>Te estamos esperando.</em>
        </h1>
        <p className="lead">Un asesor con {STORE.years} años de oficio te recibe con propuestas pensadas para vos, sin esperas.</p>
      </section>
      <Booking initialService={servicio} productName={product?.name} />
    </>
  );
}
