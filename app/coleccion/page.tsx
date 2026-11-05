import type { Metadata } from "next";
import Link from "next/link";
import { CollectionGrid } from "@/components/CollectionGrid";

export const metadata: Metadata = {
  title: "Colección",
  description: "Trajes, sacos, chalecos, pantalones, zapatillas, camisas, corbatas y accesorios de moda masculina premium.",
};

export default function Coleccion() {
  return (
    <section className="section" style={{ paddingTop: 56 }}>
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow">Colección</p>
            <h1 className="display h2">Vestite para cada momento importante</h1>
          </div>
          <Link href="/tienda" className="caps">Ver todos los productos →</Link>
        </div>
        <CollectionGrid />
      </div>
    </section>
  );
}
