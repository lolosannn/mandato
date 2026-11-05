"use client";

import { useCallback, useEffect, useState } from "react";
import { asset } from "@/lib/asset";
import { ArrowLeft, ArrowRight } from "./Icons";

const SLIDES = [
  { src: "/img/hero-puerto-madero.webp", alt: "Hombre con traje gris de tres piezas caminando en Puerto Madero al atardecer", pos: "center 22%" },
  { src: "/img/hero-saco-celeste.webp", alt: "Hombre con saco celeste y camisa a rayas caminando por una avenida arbolada", pos: "center 20%" },
  { src: "/img/local-noche.webp", alt: "Fachada del local Mandato iluminada de noche", pos: "center 40%" },
];

const INTERVAL = 5500;

// Galería de la portada: pasa sola, se frena al pasar el cursor, con flechas y puntos.
export function HeroSlider({ children }: { children?: React.ReactNode }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((dir: number) => setIndex((i) => (i + dir + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  return (
    <div
      className="hero-slider"
      onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setPaused(false)}
      role="region"
      aria-roledescription="carrusel"
      aria-label="Fotos de Mandato"
    >
      {SLIDES.map((s, i) => (
        <img
          key={s.src}
          className={`hero-slide${i === index ? " on" : ""}`}
          src={asset(s.src)}
          alt={s.alt}
          aria-hidden={i !== index}
          style={{ objectPosition: s.pos }}
          fetchPriority={i === 0 ? "high" : "auto"}
          loading={i === 0 ? "eager" : "lazy"}
        />
      ))}

      {children}

      <button type="button" className="hero-arrow prev" aria-label="Foto anterior" onClick={() => go(-1)}>
        <ArrowLeft size={22} />
      </button>
      <button type="button" className="hero-arrow next" aria-label="Foto siguiente" onClick={() => go(1)}>
        <ArrowRight size={22} />
      </button>

      <div className="hero-dots">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Ver foto ${i + 1}`}
            aria-current={i === index}
            className={i === index ? "on" : ""}
            onClick={() => setIndex(i)}
          >
            <span style={i === index && !paused ? { animationDuration: `${INTERVAL}ms` } : undefined} />
          </button>
        ))}
      </div>
    </div>
  );
}
