import Link from "next/link";
import { CATEGORIES, countByCategory } from "@/lib/products";
import { asset } from "@/lib/asset";
import { Reveal } from "./Reveal";
import { ArrowRight } from "./Icons";

// Grilla tipo "bento" con todas las categorías, agrupadas por rubro.
export function CollectionGrid() {
  return (
    <Reveal className="bento">
      {CATEGORIES.map((c, i) => {
        const n = countByCategory(c.id);
        return (
          <Link
            key={c.id}
            href={`/tienda?categoria=${c.id}`}
            className={`bento-tile bento-${c.id} rv-up`}
            style={{ transitionDelay: `${0.06 * i}s` }}
          >
            {c.id === "trajes" && (
              <img className="bento-photo" src={asset("/img/local-noche.webp")} alt="" loading="lazy" />
            )}
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
