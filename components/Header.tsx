"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { BagIcon, CloseIcon, MenuIcon } from "./Icons";
import { STORE } from "@/lib/config";
import { CATEGORIES } from "@/lib/products";
import { ArrowRight } from "./Icons";
import { asset } from "@/lib/asset";

const NAV = [
  { href: "/tienda?categoria=trajes", label: "Trajes" },
  { href: "/alquiler", label: "Alquiler" },
  { href: "/turnos", label: "Turnos" },
];

const GROUPS = Array.from(new Set(CATEGORIES.map((c) => c.group))).map((g) => ({
  group: g,
  items: CATEGORIES.filter((c) => c.group === g),
}));

export function Header() {
  const { count, toast, dismissToast } = useCart();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <div className="announce">
        <div className="wrap">
          <span>Envíos a todo el país con Andreani</span>
          <span>{STORE.installments} cuotas sin interés</span>
          <span>{Math.round(STORE.transferDiscount * 100)}% off por transferencia</span>
        </div>
      </div>
      <header className="header">
        <div className="wrap">
          <Link href="/" className="brand" aria-label="Mandato, inicio">
            <img src={asset("/img/logo-colibri.png")} alt="" width={38} height={38} />
            <span>MANDATO</span>
          </Link>
          <nav className="nav" aria-label="Principal">
            <div className="nav-drop">
              <button type="button" aria-haspopup="true">
                Colección <ArrowRight size={12} />
              </button>
              <div className="mega">
                <div className="mega-inner">
                  {GROUPS.map((g) => (
                    <div className="mega-group" key={g.group}>
                      <span>{g.group}</span>
                      {g.items.map((c) => (
                        <Link key={c.id} href={`/tienda?categoria=${c.id}`}>{c.name}</Link>
                      ))}
                    </div>
                  ))}
                  <Link className="mega-all" href="/tienda">Ver toda la colección →</Link>
                </div>
              </div>
            </div>
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <Link href="/tienda" className="icon-btn" aria-label="Ver tienda">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
            </Link>
            <Link href="/carrito" className="icon-btn" aria-label={`Carrito, ${count} productos`}>
              <BagIcon />
              {count > 0 && <span className="badge">{count}</span>}
            </Link>
            <button className="icon-btn menu-toggle" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen((o) => !o)}>
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
        <nav className={`mobile-nav${open ? " open" : ""}`} aria-label="Menú móvil">
          {GROUPS.map((g) => (
            <div key={g.group} style={{ display: "contents" }}>
              <span className="mobile-group">{g.group}</span>
              {g.items.map((c) => (
                <Link key={c.id} href={`/tienda?categoria=${c.id}`}>{c.name}</Link>
              ))}
            </div>
          ))}
          <span className="mobile-group">Mandato</span>
          <Link href="/tienda">Ver toda la colección</Link>
          <Link href="/alquiler">Alquiler</Link>
          <Link href="/turnos">Turnos</Link>
        </nav>
      </header>
      {toast && (
        <div className="toast" role="status">
          <span>
            <b>{toast.name}</b> se agregó al carrito.
          </span>
          <span style={{ display: "flex", gap: 16 }}>
            <Link href="/carrito" onClick={dismissToast}>Ver carrito</Link>
            <Link href="/checkout" onClick={dismissToast}>Finalizar compra</Link>
          </span>
        </div>
      )}
    </>
  );
}
