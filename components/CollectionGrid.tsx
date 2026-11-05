import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { CATEGORIES, countByCategory } from "@/lib/products";
import { asset } from "@/lib/asset";
import { Reveal } from "./Reveal";
import { ArrowRight } from "./Icons";

// Grilla tipo "bento" con todas las categorías, agrupadas por rubro.
// Foto de cada bloque: /public/img/coleccion/<categoria>.webp (si existe).
function categoryImage(id: string) {
  const rel = `/img/coleccion/${id}.webp`;
  if (fs.existsSync(path.join(process.cwd(), "public", rel))) return rel;
  return id === "trajes" ? "/img/local-noche.webp" : null;
}

export function CollectionGrid() {
  return (
    <Reveal className="bento">
      {CATEGORIES.map((c, i) => {
        const n = countByCategory(c.id);
        const img = categoryImage(c.id);
        return (
          <Link
            key={c.id}
            href={`/tienda?categoria=${c.id}`}
            className={`bento-tile bento-${c.id}${img ? " has-photo" : ""} rv-up`}
            style={{ transitionDelay: `${0.06 * i}s` }}
          >
            {img && <img className="bento-photo" src={asset(img)} alt="" loading="lazy" />}
            <img className="bento-mark" src={asset("/img/logo-colibri.png")} alt="" />
            <span className="bento-top">
              <span className="bento-num">0{i + 1}</span>
              <span className="bento-group">{c.group}</span>
            </span>
            <span className="bento-body">
              <span className="bento-name">{c.name}</span>
              <span className="bento-desc">{c.description}</span>
              <span className="bento-cta">
                {n} {n === 1 ? "producto" : "productos"}
                <span className="bento-arrow"><ArrowRight size={16} /></span>
              </span>
            </span>
          </Link>
        );
      })}
    </Reveal>
  );
}
