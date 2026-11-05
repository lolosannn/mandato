import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { STORE, whatsappLink } from "@/lib/config";
import { ProductCard } from "@/components/ProductCard";
import { Reviews } from "@/components/Reviews";
import { RentalSection } from "@/components/RentalSection";
import { CollectionGrid } from "@/components/CollectionGrid";
import { VisitSection } from "@/components/VisitSection";
import { HeroSlider } from "@/components/HeroSlider";
import { CalendarIcon, ChatIcon, HangerIcon, PinIcon, ShieldIcon, TruckIcon } from "@/components/Icons";
import { asset } from "@/lib/asset";

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      {/* Hero */}
      <section className="split hero">
        <div className="split-body hero-copy">
          <p className="eyebrow">Sastrería y moda masculina · Desde {STORE.since}</p>
          <h1 className="display h1">
            Tu mejor versión empieza por <em>cómo te presentás.</em>
          </h1>
          <p className="lead">
            {STORE.years} años vistiendo a hombres que marcan la diferencia. Trajes, sacos y camisas de calidad premium, en venta y
            alquiler, con el asesoramiento de quienes conocen el oficio.
          </p>
          <div className="actions">
            <Link className="btn btn-gold" href="/coleccion">Ver la colección</Link>
            <Link className="btn btn-line" href="/turnos"><CalendarIcon /> Sacar turno</Link>
          </div>
        </div>
        <div className="split-media hero-media">
          <HeroSlider>
            <div className="hero-badge">
              <strong>{STORE.years}</strong>
              <span>años de trayectoria<br />en Monte Grande</span>
            </div>
          </HeroSlider>
        </div>
      </section>

      {/* Beneficios */}
      <section className="band">
        <div className="wrap perks">
          <div className="perk"><TruckIcon /><div><b>Envíos con Andreani</b><small>A todo el país, con seguimiento</small></div></div>
          <div className="perk"><ShieldIcon /><div><b>Pago 100% seguro</b><small>Tarjetas, Mercado Pago y transferencia</small></div></div>
          <div className="perk"><HangerIcon /><div><b>Venta y alquiler</b><small>El traje justo para cada ocasión</small></div></div>
          <div className="perk"><CalendarIcon size={28} /><div><b>Turnos personalizados</b><small>Asesoramiento y prueba en el local</small></div></div>
        </div>
      </section>

      {/* Categorías */}
      <section className="section">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Colección</p>
              <h2 className="display h2">Vestite para cada momento importante</h2>
            </div>
            <Link href="/tienda" className="caps">Ver todo →</Link>
          </div>
          <CollectionGrid />
        </div>
      </section>

      {/* Destacados */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow">Tienda online</p>
              <h2 className="display h2">Lo más elegido</h2>
            </div>
            <Link href="/tienda" className="caps">Ver todo →</Link>
          </div>
          <div className="grid">
            {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </div>
      </section>

      {/* Manifiesto */}
      <section className="section on-ivory manifesto">
        <div className="wrap">
          <div className="manifesto-head">
            <div className="manifesto-title">
              <p className="eyebrow">El estándar Mandato</p>
              <h2>
                No vendemos ropa. <em>Formamos la imagen</em> del hombre que querés proyectar.
              </h2>
            </div>
            <p className="manifesto-intro">
              Tres principios que guían cada traje que sale del local, desde hace {STORE.years} años.
            </p>
          </div>

          <div className="value-grid">
            {[
              { n: "I", t: "Status", d: "Presencia que se nota antes de que digas una palabra. Cortes, telas y terminaciones pensadas para hombres de alto valor." },
              { n: "II", t: "Seguridad", d: `${STORE.years} años en el rubro respaldan cada consejo. Sabemos qué te queda bien, cómo combinarlo y qué usar en cada ocasión.` },
              { n: "III", t: "Tu mejor versión", d: "Un buen traje no te cambia: te revela. Salís del local sintiéndote preparado para lo que venga." },
            ].map((v) => (
              <article className="value-card" key={v.n} tabIndex={0}>
                <span className="value-num">{v.n}</span>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </article>
            ))}
          </div>

          <div className="stat-grid">
            <div className="stat-card"><strong>{STORE.years}</strong><span>Años en el rubro</span></div>
            <div className="stat-card"><strong>{STORE.instagramFollowers}</strong><span>Seguidores en Instagram</span></div>
            <div className="stat-card"><strong>{STORE.installments}</strong><span>Cuotas sin interés</span></div>
            {STORE.googleRating ? (
              <div className="stat-card"><strong>{STORE.googleRating.toFixed(1).replace(".", ",")}</strong><span>Calificación en Google</span></div>
            ) : (
              <div className="stat-card"><strong>{Math.round(STORE.transferDiscount * 100)}%</strong><span>Off por transferencia</span></div>
            )}
          </div>
        </div>
      </section>

      {/* Alquiler */}
      <RentalSection />

      <Reviews />

      {/* CTA turno */}
      <section className="cta-band">
        <div className="wrap">
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 720 }}>
            <h2 className="display h3" style={{ fontWeight: 600 }}>Atención personalizada, con turno y sin esperas.</h2>
            <p>Elegí día y horario, y un asesor te espera con propuestas pensadas para vos.</p>
          </div>
          <Link className="btn btn-dark" href="/turnos" style={{ minHeight: 56 }}>Sacar mi turno</Link>
        </div>
      </section>

      {/* Local */}
      <VisitSection />
    </>
  );
}
