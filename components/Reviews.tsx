import { REVIEWS } from "@/lib/reviews";
import { STORE } from "@/lib/config";

export function Reviews() {
  const rating = STORE.googleRating;
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div style={{ maxWidth: 640 }}>
            <p className="eyebrow">Reseñas</p>
            <h2 className="display h2">La confianza se gana traje a traje</h2>
          </div>
          <a className="rating-box" href={STORE.googleReviewsUrl} target="_blank" rel="noopener">
            {rating ? (
              <>
                <span className="display" style={{ fontSize: 48, lineHeight: 1 }}>{rating.toFixed(1).replace(".", ",")}</span>
                <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span className="stars" aria-label={`${rating} de 5 estrellas`}>★★★★★</span>
                  <span className="muted" style={{ fontSize: 13 }}>
                    {STORE.googleReviewsCount ? `${STORE.googleReviewsCount} reseñas en Google` : "Reseñas en Google"}
                  </span>
                </span>
              </>
            ) : (
              <span style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                <span className="stars" aria-hidden="true">★★★★★</span>
                <span style={{ fontSize: 14 }}>Ver opiniones en Google →</span>
              </span>
            )}
          </a>
        </div>

        {REVIEWS.length > 0 ? (
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
            {REVIEWS.slice(0, 6).map((r, i) => (
              <figure className="review" key={i}>
                <span className="stars" aria-label={`${r.rating ?? 5} de 5 estrellas`}>{"★".repeat(r.rating ?? 5)}</span>
                <blockquote>“{r.text}”</blockquote>
                <figcaption style={{ marginTop: "auto", display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: 500 }}>{r.name}</span>
                  {r.context && <span className="muted" style={{ fontSize: 13 }}>{r.context}</span>}
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="review" style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between" }}>
            <blockquote style={{ maxWidth: 680 }}>
              Más de {STORE.years} años de clientes que vuelven. Leé lo que dicen de nosotros o contanos tu experiencia.
            </blockquote>
            <a className="btn btn-line" href={STORE.googleReviewsUrl} target="_blank" rel="noopener">
              Ver reseñas en Google
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
