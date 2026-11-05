import type { Metadata } from "next";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { STORE, whatsappLink } from "@/lib/config";
import { ProductCard } from "@/components/ProductCard";
import { ChatIcon } from "@/components/Icons";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  title: "Alquiler de trajes",
  description: `Alquiler de trajes para casamientos, graduaciones y eventos en ${STORE.address}. Prueba y ajuste incluidos.`,
};

export default function Alquiler() {
  const rentals = PRODUCTS.filter((p) => p.rentalPrice);
  return (
    <>
      <section className="split">
        <div className="split-body">
          <p className="eyebrow">Alquiler de trajes</p>
          <h1 className="display h1">
            Llegá impecable a <em>tu gran día.</em>
          </h1>
          <p className="lead">
            Casamientos, graduaciones, fiestas y eventos de empresa. Elegís el traje, lo probás con un asesor y lo ajustamos para que te quede como hecho a medida.
          </p>
          <div className="actions">
            <Link className="btn btn-gold" href="/turnos?servicio=alquiler">Reservar turno</Link>
            <a className="btn btn-line" href={whatsappLink("Hola Mandato! Quería consultar por el alquiler de un traje.")} target="_blank" rel="noopener">
              <ChatIcon /> Consultar disponibilidad
            </a>
          </div>
        </div>
        <div className="split-media">
          <img src={asset("/img/local-vidriera.webp")} alt="Vidriera de Mandato con trajes en exhibición" />
        </div>
      </section>

      <section className="section on-ivory">
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          <h2 className="display h2">Cómo funciona</h2>
          <div className="pillars">
            <div className="pillar"><span className="num">1.</span><h3>Reservá</h3><p>Sacá turno online o por WhatsApp. Te recomendamos venir 2 o 3 semanas antes del evento.</p></div>
            <div className="pillar"><span className="num">2.</span><h3>Probá y ajustá</h3><p>Te asesoramos en el local, elegís el traje y tomamos las medidas para los ajustes.</p></div>
            <div className="pillar"><span className="num">3.</span><h3>Retirá y devolvé</h3><p>Lo retirás listo antes del evento y lo devolvés después. Nosotros nos ocupamos de la limpieza.</p></div>
          </div>
        </div>
      </section>

      {rentals.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div>
                <p className="eyebrow">Disponibles para alquilar</p>
                <h2 className="display h2">Trajes en alquiler</h2>
              </div>
            </div>
            <div className="grid">
              {rentals.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
