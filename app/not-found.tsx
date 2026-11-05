import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap" style={{ display: "flex", flexDirection: "column", gap: 20, alignItems: "flex-start" }}>
        <p className="eyebrow">Error 404</p>
        <h1 className="display h2">Esta página no existe.</h1>
        <p className="lead">Puede que el producto ya no esté disponible. Mirá la colección completa.</p>
        <Link className="btn btn-gold" href="/tienda">Ver la colección</Link>
      </div>
    </section>
  );
}
