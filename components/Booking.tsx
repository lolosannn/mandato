"use client";

import { useEffect, useMemo, useState } from "react";
import { STORE, whatsappLink } from "@/lib/config";
import { ArrowLeft, ArrowRight, ChatIcon } from "./Icons";

export const SERVICES = [
  { id: "asesoramiento", title: "Asesoramiento de compra", sub: "Armamos juntos tu look para trabajo o evento.", dur: "45 min" },
  { id: "alquiler", title: "Alquiler para evento", sub: "Casamientos, graduaciones y fiestas.", dur: "45 min" },
  { id: "ajustes", title: "Ajustes de sastrería", sub: "Ruedos, entalle y largo de mangas.", dur: "30 min" },
  { id: "retiro", title: "Retiro y prueba final", sub: "Probás tu traje listo antes de llevarlo.", dur: "20 min" },
] as const;

// Agenda base del local (ajustar a los horarios reales). 0 = domingo.
const SLOTS: Record<number, string[]> = {
  1: ["10:00", "11:00", "12:00", "16:00", "17:00", "18:00", "19:00"],
  2: ["10:00", "11:00", "12:00", "16:00", "17:00", "18:00", "19:00"],
  3: ["10:00", "11:00", "12:00", "16:00", "17:00", "18:00", "19:00"],
  4: ["10:00", "11:00", "12:00", "16:00", "17:00", "18:00", "19:00"],
  5: ["10:00", "11:00", "12:00", "16:00", "17:00", "18:00", "19:00"],
  6: ["10:00", "11:00", "12:00", "16:00", "17:00", "18:00"],
};
const DOW = ["LU", "MA", "MI", "JU", "VI", "SÁ", "DO"];
const DAY_NAMES = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export function Booking({ initialService, productName }: { initialService?: string; productName?: string }) {
  const today = useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);
  const [svc, setSvc] = useState(SERVICES.find((s) => s.id === initialService)?.id ?? SERVICES[0].id);
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [day, setDay] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [occasion, setOccasion] = useState("");
  const [error, setError] = useState("");
  // El calendario depende de la fecha del visitante: se dibuja recién en el navegador.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const maxMonth = new Date(today.getFullYear(), today.getMonth() + 2, 1);
  const cells = useMemo(() => {
    const first = new Date(month.getFullYear(), month.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7; // lunes primero
    const daysIn = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
    const out: (Date | null)[] = Array(offset).fill(null);
    for (let d = 1; d <= daysIn; d++) out.push(new Date(month.getFullYear(), month.getMonth(), d));
    return out;
  }, [month]);

  const slots = useMemo(() => {
    if (!day) return [];
    const list = SLOTS[day.getDay()] ?? [];
    if (!sameDay(day, today)) return list;
    const now = new Date();
    return list.filter((t) => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m > now.getHours() * 60 + now.getMinutes() + 60;
    });
  }, [day, today]);

  const service = SERVICES.find((s) => s.id === svc)!;
  const dayLabel = day ? `${DAY_NAMES[day.getDay()]} ${day.getDate()} de ${MONTHS[day.getMonth()]}` : "—";

  function confirm() {
    if (!day || !time) return setError("Elegí un día y un horario.");
    if (!name.trim()) return setError("Decinos tu nombre.");
    setError("");
    const msg = [
      `Hola Mandato! Quiero reservar un turno.`,
      `Servicio: ${service.title}`,
      `Día: ${dayLabel} a las ${time} h`,
      `Nombre: ${name.trim()}`,
      occasion.trim() ? `Ocasión: ${occasion.trim()}` : "",
      productName ? `Me interesa: ${productName}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(msg), "_blank", "noopener");
  }

  return (
    <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: 40, paddingBottom: 112, alignItems: "flex-start" }}>
      <div style={{ flex: "1.6 1 580px", minWidth: 0, display: "flex", flexDirection: "column", gap: 44 }}>
        <fieldset>
          <legend>1 · ¿Qué necesitás?</legend>
          <div className="services">
            {SERVICES.map((s) => (
              <button key={s.id} type="button" className="service" aria-pressed={s.id === svc} onClick={() => setSvc(s.id)}>
                <b>{s.title}</b>
                <span>{s.sub}</span>
                <small>{s.dur}</small>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>2 · Día y horario</legend>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 24 }}>
            <div className="calendar">
              <div className="cal-head">
                <button type="button" className="icon-btn" aria-label="Mes anterior" disabled={month <= new Date(today.getFullYear(), today.getMonth(), 1)} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}>
                  <ArrowLeft />
                </button>
                <span className="cal-title" aria-live="polite">{MONTHS[month.getMonth()]} {month.getFullYear()}</span>
                <button type="button" className="icon-btn" aria-label="Mes siguiente" disabled={month >= maxMonth} onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}>
                  <ArrowRight />
                </button>
              </div>
              <div className="cal-grid">
                {DOW.map((d) => <span key={d} className="cal-dow" aria-hidden="true">{d}</span>)}
                {mounted && cells.map((d, i) =>
                  d ? (
                    <button
                      key={i}
                      type="button"
                      className="day"
                      disabled={d < today || !(SLOTS[d.getDay()]?.length)}
                      aria-pressed={!!day && sameDay(d, day)}
                      aria-label={`${DAY_NAMES[d.getDay()]} ${d.getDate()} de ${MONTHS[d.getMonth()]}`}
                      onClick={() => { setDay(d); setTime(""); }}
                    >
                      {d.getDate()}
                    </button>
                  ) : (
                    <span key={i} />
                  ),
                )}
              </div>
            </div>
            <div style={{ flex: "1 1 220px", minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              <span style={{ fontSize: 14, color: "var(--muted-2)" }}>
                {day ? `Horarios para el ${dayLabel}` : "Elegí un día para ver los horarios"}
              </span>
              <div className="slots">
                {slots.map((t) => (
                  <button key={t} type="button" className="slot" aria-pressed={t === time} onClick={() => setTime(t)}>{t}</button>
                ))}
              </div>
              {day && slots.length === 0 && <span className="muted" style={{ fontSize: 14 }}>No quedan horarios para este día.</span>}
              <span className="muted" style={{ fontSize: 13 }}>Domingos cerrado.</span>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>3 · Tus datos</legend>
          <div className="form-grid">
            <label className="field">Nombre y apellido<input className="input" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" /></label>
            <label className="field">¿Para qué ocasión? (opcional)<input className="input" value={occasion} onChange={(e) => setOccasion(e.target.value)} placeholder="Casamiento, graduación, trabajo…" /></label>
          </div>
        </fieldset>
      </div>

      <aside className="aside-ivory">
        <h2 className="display" style={{ fontSize: 32 }}>Tu turno</h2>
        <dl className="info-list">
          <dt>Servicio</dt><dd>{service.title}</dd>
          <dt>Día</dt><dd style={{ textTransform: "capitalize" }}>{dayLabel}</dd>
          <dt>Hora</dt><dd>{time ? `${time} h` : "—"}</dd>
          <dt>Lugar</dt><dd>{STORE.address}</dd>
          {productName && (<><dt>Producto</dt><dd>{productName}</dd></>)}
        </dl>
        {error && <p className="error" role="alert" style={{ margin: 0 }}>{error}</p>}
        <button type="button" className="btn btn-dark btn-block" style={{ minHeight: 58 }} onClick={confirm}>
          <ChatIcon /> Confirmar por WhatsApp
        </button>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: "#4a4640" }}>
          Se abre WhatsApp con tu turno ya escrito. Lo confirmamos en minutos y te mandamos un recordatorio.
        </p>
        <div style={{ borderTop: "1px solid #d6cec1", paddingTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <span className="eyebrow dark">Qué te espera</span>
          <ul style={{ margin: 0, paddingLeft: 18, display: "flex", flexDirection: "column", gap: 6, fontSize: 15, lineHeight: 1.5 }}>
            <li>Asesor dedicado durante todo el turno</li>
            <li>Toma de medidas y prueba de calce</li>
            <li>Propuestas de combinación completas</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
