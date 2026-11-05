import { STORE, whatsappLink } from "@/lib/config";
import { asset } from "@/lib/asset";
import { Reveal } from "./Reveal";
import { ChatIcon, ClockIcon, InstagramIcon, PinIcon } from "./Icons";

export function VisitSection() {
  const cards = [
    { icon: <PinIcon size={24} />, label: "Dirección", value: STORE.address, sub: "Monte Grande, Buenos Aires", href: STORE.mapsUrl, cta: "Cómo llegar" },
    { icon: <ClockIcon size={24} />, label: "Horarios", value: STORE.hours.split("·")[0].trim(), sub: STORE.hours.split("·").slice(1).join("·").trim(), href: "/turnos", cta: "Sacar turno", internal: true },
    { icon: <ChatIcon size={24} />, label: "WhatsApp", value: "Escribinos", sub: "Consultas y reservas", href: whatsappLink("Hola Mandato! Quería hacer una consulta."), cta: "Abrir chat" },
    { icon: <InstagramIcon size={24} />, label: "Instagram", value: `@${STORE.instagram}`, sub: `${STORE.instagramFollowers} seguidores`, href: `https://instagram.com/${STORE.instagram}`, cta: "Seguinos" },
  ];

  return (
    <Reveal as="section" className="visit">
      <div className="wrap">
        <div className="visit-head">
          <div>
            <p className="eyebrow rv-up">Visitanos</p>
            <h2 className="visit-title rv-up" style={{ transitionDelay: "0.1s" }}>
              Te esperamos en <em>Monte Grande</em>
            </h2>
          </div>
          <p className="visit-lead rv-up" style={{ transitionDelay: "0.2s" }}>
            Vení a probarte, a que te asesoremos o simplemente a conocer el local. {STORE.years} años en {STORE.address}.
          </p>
        </div>

        <div className="visit-grid">
          <div className="visit-photo rv-up" style={{ transitionDelay: "0.15s" }}>
            <img src={asset("/img/local-noche.webp")} alt="Fachada de Mandato en Alem 131, Monte Grande" loading="lazy" />
            <div className="visit-photo-caption">
              <span>MANDATO</span>
              <strong>{STORE.address}</strong>
            </div>
          </div>

          <div className="visit-map rv-up" style={{ transitionDelay: "0.25s" }}>
            <iframe title={`Mapa: ${STORE.addressFull}`} src={STORE.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
          </div>

          <div className="visit-cards">
            {cards.map((c, i) => (
              <a
                key={c.label}
                className="visit-card rv-up"
                style={{ transitionDelay: `${0.3 + i * 0.08}s` }}
                href={c.internal ? asset(c.href) : c.href}
                {...(c.internal ? {} : { target: "_blank", rel: "noopener" })}
              >
                <span className="visit-icon">{c.icon}</span>
                <span className="visit-label">{c.label}</span>
                <span className="visit-value">{c.value}</span>
                {c.sub && <span className="visit-sub">{c.sub}</span>}
                <span className="visit-cta">{c.cta} →</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
