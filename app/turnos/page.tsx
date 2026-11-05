import type { Metadata } from "next";
import { Suspense } from "react";
import { BookingFromUrl } from "@/components/BookingFromUrl";
import { STORE } from "@/lib/config";

export const metadata: Metadata = {
  title: "Sacar turno",
  description: `Reservá tu turno de asesoramiento, alquiler o sastrería en ${STORE.address}.`,
};

export default function Turnos() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: "clamp(48px, 6vw, 88px)", paddingBottom: 40, display: "flex", flexDirection: "column", gap: 16 }}>
        <p className="eyebrow">Atención personalizada</p>
        <h1 className="display h1" style={{ maxWidth: 900 }}>
          Reservá tu turno. <em>Te estamos esperando.</em>
        </h1>
        <p className="lead">Un asesor con {STORE.years} años de oficio te recibe con propuestas pensadas para vos, sin esperas.</p>
      </section>
      <Suspense fallback={null}>
        <BookingFromUrl />
      </Suspense>
    </>
  );
}
