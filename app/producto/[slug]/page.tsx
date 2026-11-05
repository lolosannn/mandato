import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CATEGORIES, PRODUCTS, getProduct } from "@/lib/products";
import { money } from "@/lib/format";
import { STORE, whatsappLink } from "@/lib/config";
import { ProductBuy } from "@/components/AddToCart";
import { ProductCard } from "@/components/ProductCard";
import { ChatIcon } from "@/components/Icons";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  if (!p) return {};
  return { title: p.name, description: p.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const cat = CATEGORIES.find((c) => c.id === product.category)!;
  const pairs = (product.pairsWith ?? []).map((s) => PRODUCTS.find((p) => p.slug === s)).filter(Boolean) as typeof PRODUCTS;
  const related = pairs.length
    ? pairs
    : PRODUCTS.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "MANDATO" },
    offers: { "@type": "Offer", priceCurrency: "ARS", price: product.price, availability: "https://schema.org/InStock" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="wrap">
        <nav className="breadcrumb" aria-label="Ruta">
          <Link href="/">Inicio</Link> / <Link href={`/tienda?categoria=${cat.id}`}>{cat.name}</Link> /{" "}
          <span style={{ color: "var(--ivory)" }}>{product.name}</span>
        </nav>
        <ProductBuy product={product}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <span className="caps muted" style={{ fontSize: 12 }}>{cat.name}</span>
            <h1 className="display" style={{ fontSize: "clamp(34px, 3.6vw, 52px)" }}>{product.name}</h1>
          </div>
          <div className="pdp-price">
            <span className="amount">{money(product.price)}</span>
            <span>
              {STORE.installments} cuotas sin interés de {money(product.price / STORE.installments)} ·{" "}
              {money(product.price * (1 - STORE.transferDiscount))} por transferencia
            </span>
            {product.rentalPrice && (
              <span>
                Alquiler para eventos: {money(product.rentalPrice)} · <Link href="/alquiler">Cómo funciona</Link>
              </span>
            )}
          </div>
        </ProductBuy>
      </div>

      <section className="on-ivory">
        <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: 32, alignItems: "center", justifyContent: "space-between", paddingTop: 56, paddingBottom: 56 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 720 }}>
            <p className="eyebrow">¿Dudas con el talle o la combinación?</p>
            <p className="display" style={{ fontSize: "clamp(26px, 2.6vw, 36px)", lineHeight: 1.25, fontStyle: "italic" }}>
              Escribinos y un asesor con {STORE.years} años de oficio te ayuda a elegir.
            </p>
          </div>
          <a className="btn btn-dark" href={whatsappLink(`Hola Mandato! Tengo una consulta sobre: ${product.name}`)} target="_blank" rel="noopener">
            <ChatIcon /> Consultar a un asesor
          </a>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <div><h2 className="display h3">{pairs.length ? "Completá el look" : "También te puede gustar"}</h2></div>
            </div>
            <div className="grid">
              {related.slice(0, 4).map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
