import Link from "next/link";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { STORE, whatsappLink } from "@/lib/config";
import { ProductCard } from "@/components/ProductCard";
import { Reviews } from "@/components/Reviews";
import { CalendarIcon, ChatIcon, HangerIcon, PinIcon, ShieldIcon, TruckIcon } from "@/components/Icons";
import { asset } from "@/lib/asset";

export default function Home() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 4);

  return (
    <>
      {/* Hero */}
      <section className="split">
        <div className="split-body">
          <p className="eyebrow">Sastrería y moda masculina · Desde {STORE.since}</p>
          <h1 className="display h1">
            Tu mejor versión empieza por <em>cómo te presentás.</em>
          </h1>
          <p className="lead">
            {STORE.years} años vistiendo a hombres que marcan la diferencia. Trajes, sacos y camisas de calidad premium, en venta y
            alquiler, con el asesoramiento de quienes conocen el oficio.
          </p>
          <div className="actions">
            <Link className="btn btn-gold" href="/tienda">Ver la colección</Link>
            <Link className="btn btn-line" href="/turnos"><CalendarIcon /> Sacar turno</Link>
          </div>
        </div>
        <div className="split-media" style={{ minHeight: 560 }}>
          <img src={asset("/img/local-noche.webp")} alt="Fachada del local Mandato iluminada de noche" fetchPriority="high" style={{ objectPosition: "center 40%" }} />
          <div className="hero-badge">
            <strong>{STORE.years}</strong>
            <span>años de trayectoria<br />en Monte Grande</span>
          </div>
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
          <div className="grid-4">
            {CATEGORIES.map((c) => (
              <Link key={c.id} href={`/tienda?categoria=${c.id}`} className="cat-card">
                <div className="ph">
                  <img className="ph-logo" src={asset("/img/logo-colibri.png")} alt="" />
                  <b>{c.name}</b>
                </div>
                <span className="caps" style={{ fontSize: 13 }}>{c.description}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Manifiesto */}
      <section className="section on-ivory">
        <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 880 }}>
            <p className="eyebrow">El estándar Mandato</p>
            <h2 className="display h2">
              No vendemos ropa. <em>Formamos la imagen</em> del hombre que querés proyectar.
            </h2>
          </div>
          <div className="pillars">
            <div className="pillar">
              <span className="num">I.</span>
              <h3>Status</h3>
              <p>Presencia que se nota antes de que digas una palabra. Cortes, telas y terminaciones pensadas para hombres de alto valor.</p>
            </div>
            <div className="pillar">
              <span className="num">II.</span>
              <h3>Seguridad</h3>
              <p>{STORE.years} años en el rubro respaldan cada consejo. Sabemos qué te queda bien, cómo combinarlo y qué usar en cada ocasión.</p>
            </div>
            <div className="pillar">
              <span className="num">III.</span>
              <h3>Tu mejor versión</h3>
              <p>Un buen traje no te cambia: te revela. Salís del local sintiéndote preparado para lo que venga.</p>
            </div>
          </div>
          <div className="stats">
            <div className="stat"><strong>{STORE.years}</strong><span>Años en el rubro</span></div>
            <div className="stat"><strong>{STORE.instagramFollowers}</strong><span>Seguidores en Instagram</span></div>
            {STORE.googleRating && (
              <div className="stat"><strong>{STORE.googleRating.toFixed(1).replace(".", ",")} ★</strong><span>Calificación en Google</span></div>
            )}
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="section">
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

      {/* Alquiler */}
      <section className="band split">
        <div className="split-media">
          <img src={asset("/img/local-vidriera.webp")} alt="Vidriera del local Mandato con trajes en exhibición" loading="lazy" />
        </div>
        <div className="split-body">
          <p className="eyebrow">Alquiler de trajes</p>
          <h2 className="display h2">¿Casamiento, graduación o evento? Llegá impecable.</h2>
          <ol className="steps">
            <li><span>1</span>Reservás tu turno online o por WhatsApp</li>
            <li><span>2</span>Te asesoramos y probás en el local</li>
            <li><span>3</span>Ajustamos el calce y lo retirás listo</li>
            <li><span>4</span>Lo devolvés después del evento</li>
          </ol>
          <div className="actions">
            <Link className="btn btn-gold" href="/turnos?servicio=alquiler">Reservar turno</Link>
            <a className="btn btn-line" href={whatsappLink("Hola Mandato! Quería consultar por el alquiler de un traje.")} target="_blank" rel="noopener">
              <ChatIcon /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

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
      <section className="section">
        <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: 48 }}>
          <div style={{ flex: "1 1 380px", minWidth: 0, display: "flex", flexDirection: "column", gap: 24 }}>
            <p className="eyebrow">Visitanos</p>
            <h2 className="display h2">{STORE.address}</h2>
            <dl className="info-list">
              <dt>Horarios</dt><dd>{STORE.hours}</dd>
              <dt>WhatsApp</dt><dd><a href={whatsappLink()} target="_blank" rel="noopener">Escribinos</a></dd>
              <dt>Instagram</dt><dd><a href={`https://instagram.com/${STORE.instagram}`} target="_blank" rel="noopener">@{STORE.instagram}</a></dd>
            </dl>
            <a className="btn btn-line" style={{ alignSelf: "flex-start" }} href={STORE.mapsUrl} target="_blank" rel="noopener">
              <PinIcon /> Cómo llegar
            </a>
          </div>
          <div style={{ flex: "1.4 1 460px", minWidth: 0 }}>
            <iframe className="map" title={`Mapa: ${STORE.addressFull}`} src={STORE.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>
    </>
  );
}
