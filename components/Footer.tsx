import Link from "next/link";
import { STORE, whatsappLink } from "@/lib/config";
import { ChatIcon } from "./Icons";

export function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="wrap footer-top">
          <div className="footer-col" style={{ flex: "1.4 1 280px", gap: 20 }}>
            <Link href="/" className="brand" aria-label="Mandato, inicio">
              <img src="/img/logo-colibri.png" alt="" width={36} height={36} />
              <span>MANDATO</span>
            </Link>
            <p style={{ margin: 0, lineHeight: 1.6, maxWidth: 340 }}>
              {STORE.tagline}. {STORE.years} años vistiendo a hombres que marcan la diferencia. Vestite para destacar de verdad.
            </p>
            <p style={{ margin: 0, lineHeight: 1.6 }}>
              {STORE.addressFull}
              <br />
              {STORE.hours}
            </p>
          </div>
          <div className="footer-col">
            <h2>Tienda</h2>
            <Link href="/tienda?categoria=trajes">Trajes</Link>
            <Link href="/tienda?categoria=sacos">Sacos y blazers</Link>
            <Link href="/tienda?categoria=camisas">Camisas</Link>
            <Link href="/tienda?categoria=accesorios">Accesorios</Link>
            <Link href="/alquiler">Alquiler de trajes</Link>
          </div>
          <div className="footer-col">
            <h2>Ayuda</h2>
            <Link href="/ayuda#envios">Envíos con Andreani</Link>
            <Link href="/ayuda#cambios">Cambios y devoluciones</Link>
            <Link href="/ayuda#talles">Guía de talles</Link>
            <Link href="/ayuda#pagos">Medios de pago</Link>
          </div>
          <div className="footer-col">
            <h2>Mandato</h2>
            <Link href="/turnos">Sacar turno</Link>
            <a href={whatsappLink()} target="_blank" rel="noopener">WhatsApp</a>
            <a href={`https://instagram.com/${STORE.instagram}`} target="_blank" rel="noopener">Instagram</a>
            <a href={STORE.mapsUrl} target="_blank" rel="noopener">Cómo llegar</a>
          </div>
        </div>
        <div className="wrap footer-bottom">
          <span>© {new Date().getFullYear()} MANDATO®. Todos los derechos reservados.</span>
          <div className="chips">
            <span className="chip">Mercado Pago</span>
            <span className="chip">Visa</span>
            <span className="chip">Mastercard</span>
            <span className="chip">Transferencia</span>
            <span className="chip">Envíos Andreani</span>
          </div>
        </div>
      </footer>
      <a className="wa-float" href={whatsappLink("Hola Mandato! Quería hacer una consulta.")} target="_blank" rel="noopener" aria-label="Escribinos por WhatsApp">
        <ChatIcon size={26} />
      </a>
    </>
  );
}
