import type { Product } from "@/lib/products";

// Muestra la foto del producto o, si todavía no hay, un placeholder de marca.
export function ProductImage({
  product,
  index = 0,
  colorHex,
  className = "",
  showName = true,
  priority = false,
}: {
  product: Product;
  index?: number;
  colorHex?: string;
  className?: string;
  showName?: boolean;
  priority?: boolean;
}) {
  const src = product.images[index];
  const hex = colorHex ?? product.colors[0]?.hex;
  return (
    <div className={`ph ${className}`}>
      {src ? (
        <img className="photo" src={src} alt={product.name} loading={priority ? "eager" : "lazy"} />
      ) : (
        <>
          <img className="ph-logo" src="/img/logo-colibri.png" alt="" />
          {showName && <span style={{ fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase" }}>{product.name}</span>}
          <span className="swatch-band" style={{ background: hex }} />
        </>
      )}
    </div>
  );
}
