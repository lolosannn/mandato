import Link from "next/link";
import { CATEGORIES, type Product } from "@/lib/products";
import { money } from "@/lib/format";
import { STORE } from "@/lib/config";
import { ProductImage } from "./ProductImage";

export function ProductCard({ product }: { product: Product }) {
  const cat = CATEGORIES.find((c) => c.id === product.category)?.name;
  return (
    <Link href={`/producto/${product.slug}`} className="product-card">
      <div style={{ position: "relative" }}>
        {product.tag && <span className={`tag${product.tag === "Oferta" ? " red" : ""}`}>{product.tag}</span>}
        <ProductImage product={product} showName={false} />
      </div>
      <div className="meta">
        <span className="cat">{cat}</span>
        <span className="name">{product.name}</span>
        <span className="price">{money(product.price)}</span>
        <small>
          {STORE.installments} cuotas sin interés de {money(product.price / STORE.installments)}
          {product.rentalPrice ? " · También en alquiler" : ""}
        </small>
      </div>
    </Link>
  );
}
