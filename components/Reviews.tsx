import { REVIEWS, type Review } from "@/lib/reviews";
import { STORE } from "@/lib/config";

const AVATAR_TONES = ["#B8915A", "#7A5A2E", "#3A352F", "#5E1A22", "#1F2A44"];

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function GoogleMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.8 1.1 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function ReviewCard({ r, i }: { r: Review; i: number }) {
  return (
    <figure className="rv-card">
      <div className="rv-top">
        <span className="rv-avatar" style={{ background: AVATAR_TONES[i % AVATAR_TONES.length] }} aria-hidden="true">
          {initials(r.name)}
        </span>
        <span className="rv-who">
          <span className="rv-name">{r.name}</span>
          <span className="rv-meta">{r.context ?? "Cliente"} · Google</span>
        </span>
        <GoogleMark />
      </div>
      <span className="stars" aria-label={`${r.rating ?? 5} de 5 estrellas`}>{"★".repeat(r.rating ?? 5)}</span>
      <blockquote>“{r.text}”</blockquote>
    </figure>
  );
}

export function Reviews() {
  const rating = STORE.googleRating;
  const list = REVIEWS;

  return (
    <section className="section reviews-section">
      <div className="wrap">
        <div className="section-head">
          <div style={{ maxWidth: 640 }}>
            <p className="eyebrow">Reseñas</p>
            <h2 className="display h2">La confianza se gana traje a traje</h2>
          </div>
          <a className="rating-box" href={STORE.googleReviewsUrl} target="_blank" rel="noopener">
            <GoogleMark />
            <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span className="stars" aria-hidden="true">★★★★★</span>
              <span style={{ fontSize: 14 }}>
                {rating ? `${rating.toFixed(1).replace(".", ",")} en Google · ` : ""}Ver todas las reseñas →
              </span>
            </span>
          </a>
        </div>
      </div>

      {list.length > 0 && (
        <div className="rv-marquee" role="region" aria-label="Reseñas de clientes en Google">
          <div className="rv-track" style={{ ["--rv-duration" as string]: `${list.length * 7}s` }}>
            <div className="rv-group">
              {list.map((r, i) => <ReviewCard key={r.name} r={r} i={i} />)}
            </div>
            {/* Copia para que el movimiento sea continuo; los lectores de pantalla la ignoran */}
            <div className="rv-group" aria-hidden="true">
              {list.map((r, i) => <ReviewCard key={r.name} r={r} i={i} />)}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
