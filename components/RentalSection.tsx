"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { whatsappLink } from "@/lib/config";
import { asset } from "@/lib/asset";
import { CalendarIcon, ChatIcon, HangerIcon, SwapIcon } from "./Icons";

const OCCASIONS = ["casamiento", "graduación", "fiesta de egresados", "bautismo", "evento de empresa"];

const STEPS = [
  { title: "Reservá", text: "Sacá turno online o por WhatsApp. Ideal 2 o 3 semanas antes.", icon: <CalendarIcon size={22} /> },
  { title: "Probá", text: "Un asesor te arma el look completo y elegís con calma.", icon: <HangerIcon size={22} /> },
  { title: "Ajustamos", text: "Tomamos medidas y lo dejamos como hecho a medida.", icon: <SwapIcon size={22} /> },
  { title: "Lucite", text: "Lo retirás listo y lo devolvés después del evento.", icon: <span className="rent-star" aria-hidden="true">✦</span> },
];

export function RentalSection() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [word, setWord] = useState(0);
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);

  // Aparece al entrar en pantalla
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Palabra que rota en el título
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setWord((w) => (w + 1) % OCCASIONS.length), 2400);
    return () => clearInterval(t);
  }, [visible]);

  // Pasos que avanzan solos (se frenan al pasar el cursor)
  useEffect(() => {
    if (!visible || paused) return;
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 2800);
    return () => clearInterval(t);
  }, [visible, paused]);

  return (
    <section ref={ref} className={`rent${visible ? " is-in" : ""}`} aria-labelledby="rent-title">
      <div className="rent-hero">
        <div className="rent-media">
          <img src={asset("/img/alquiler-gala.webp")} alt="Hombre con traje azul de tres piezas llegando a una gala en un palacio iluminado" loading="lazy" />
          <div className="rent-badge">
            <strong>Prueba y ajuste</strong>
            <span>incluidos en el alquiler</span>
          </div>
        </div>

        <div className="rent-copy">
          <p className="eyebrow rv-up" style={{ transitionDelay: "0.05s" }}>Alquiler de trajes</p>
          <h2 id="rent-title" className="rent-title rv-up" style={{ transitionDelay: "0.15s" }}>
            ¿Se viene tu
            <span className="rent-word" aria-live="polite">
              {OCCASIONS.map((o, i) => (
                <span key={o} className={i === word ? "on" : i === (word - 1 + OCCASIONS.length) % OCCASIONS.length ? "off" : ""} aria-hidden={i !== word}>
                  {o}?
                </span>
              ))}
            </span>
            <span className="rent-title-end">Llegá impecable.</span>
          </h2>
          <p className="rent-lead rv-up" style={{ transitionDelay: "0.25s" }}>
            Elegís el traje, lo probás con un asesor y lo ajustamos a tu medida. Vos solo te ocupás de disfrutar.
          </p>
          <div className="actions rv-up" style={{ transitionDelay: "0.35s" }}>
            <Link className="btn btn-gold btn-shine" href="/turnos?servicio=alquiler">Reservar turno</Link>
            <a className="btn btn-line" href={whatsappLink("Hola Mandato! Quería consultar por el alquiler de un traje.")} target="_blank" rel="noopener">
              <ChatIcon /> Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="wrap">
        <ol className="rent-steps" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <span className="rent-progress" aria-hidden="true" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className={`rent-step rv-up${i === step ? " active" : ""}${i < step ? " done" : ""}`}
              style={{ transitionDelay: `${0.2 + i * 0.12}s` }}
              onMouseEnter={() => setStep(i)}
            >
              <span className="rent-step-num">0{i + 1}</span>
              <span className="rent-step-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>

    </section>
  );
}
