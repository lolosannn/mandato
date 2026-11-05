"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CATEGORIES, PRODUCTS, getCategory } from "@/lib/products";
import { ProductCard } from "./ProductCard";

export function TiendaView() {
  const categoria = useSearchParams().get("categoria");
  const cat = categoria ? getCategory(categoria) : undefined;
  const list = cat ? PRODUCTS.filter((p) => p.category === cat.id) : PRODUCTS;

  return (
    <section className="section" style={{ paddingTop: 56 }}>
      <div className="wrap">
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          <p className="eyebrow">Tienda online</p>
          <h1 className="display h2">{cat ? cat.name : "Toda la colección"}</h1>
          {cat && <p className="lead">{cat.description}</p>}
        </div>
        <nav className="filters" aria-label="Categorías">
          <Link className="filter" href="/tienda" aria-current={!cat ? "page" : undefined}>Todo</Link>
          {CATEGORIES.map((c) => (
            <Link key={c.id} className="filter" href={`/tienda?categoria=${c.id}`} aria-current={cat?.id === c.id ? "page" : undefined}>
              {c.name}
            </Link>
          ))}
        </nav>
        <div className="grid">
          {list.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </div>
    </section>
  );
}
