"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";
import { STORE, whatsappLink } from "@/lib/config";
import { money } from "@/lib/format";

type TransferOrder = {
  orderId: string;
  total: number;
  shipping: string;
  summary: string[];
  customer?: string;
  bank: { alias: string; cbu: string; holder: string };
};

function Resultado() {
  const params = useSearchParams();
  const estado = params.get("estado");
  const pedido = params.get("pedido") ?? "";
  const { clear, ready } = useCart();
  const [order, setOrder] = useState<TransferOrder | null>(null);

  useEffect(() => {
    if (!ready) return;
    if (estado === "aprobado" || estado === "pendiente" || estado === "transferencia") clear();
    if (estado === "transferencia") {
      try {
        const raw = sessionStorage.getItem("mandato-last-order");
        if (raw) setOrder(JSON.parse(raw));
      } catch {}
    }
  }, [estado, ready, clear]);

  let title = "¡Gracias por tu compra!";
  let text = "Tu pago fue aprobado. Te enviamos el detalle por email y te avisamos cuando tu pedido esté en camino.";
  let wa = `Hola Mandato! Hice el pedido ${pedido} y quería coordinar la entrega.`;
  if (estado === "pendiente") {
    title = "Tu pago está pendiente";
    text = "Mercado Pago está procesando el pago. Apenas se acredite, preparamos tu pedido.";
  } else if (estado === "rechazado") {
    title = "El pago no se pudo completar";
    text = "No se realizó ningún cobro. Podés intentar de nuevo con otro medio de pago o escribirnos y te ayudamos.";
    wa = `Hola Mandato! Tuve un problema al pagar el pedido ${pedido}.`;
  } else if (estado === "transferencia") {
    title = "¡Pedido reservado!";
    text = "Transferí el total y mandanos el comprobante por WhatsApp. Apenas lo confirmemos, preparamos tu pedido.";
    if (order) {
      wa = [
        `Hola Mandato! Soy ${order.customer ?? ""}. Te envío el comprobante del pedido ${order.orderId}:`,
        ...order.summary,
        `Entrega: ${order.shipping}`,
        `Total: ${money(order.total)}`,
      ].join("\n");
    }
  }

  return (
    <div className="light">
      <div className="wrap" style={{ paddingTop: 72, paddingBottom: 120, display: "flex", flexDirection: "column", gap: 24, maxWidth: 820 }}>
        {pedido && <p className="eyebrow dark">Pedido {pedido}</p>}
        <h1 className="display h2">{title}</h1>
        <p style={{ margin: 0, fontSize: 18, lineHeight: 1.6 }}>{text}</p>

        {estado === "transferencia" && order && (
          <div style={{ background: "var(--ink)", color: "var(--ivory)", padding: 28, display: "flex", flexDirection: "column", gap: 14 }}>
            <span className="caps" style={{ fontSize: 13, color: "var(--brass-text)" }}>Datos para transferir</span>
            <dl className="info-list">
              <dt>Total</dt><dd style={{ fontSize: 22, color: "var(--brass-text)" }}>{money(order.total)}</dd>
              {order.bank.alias && (<><dt>Alias</dt><dd>{order.bank.alias}</dd></>)}
              {order.bank.cbu && (<><dt>CBU</dt><dd>{order.bank.cbu}</dd></>)}
              {order.bank.holder && (<><dt>Titular</dt><dd>{order.bank.holder}</dd></>)}
            </dl>
            {!order.bank.alias && !order.bank.cbu && (
              <p style={{ margin: 0, fontSize: 15, color: "var(--muted-2)" }}>Escribinos por WhatsApp y te pasamos los datos bancarios.</p>
            )}
          </div>
        )}

        <div className="actions">
          <a className="btn btn-dark" href={whatsappLink(wa)} target="_blank" rel="noopener">
            {estado === "transferencia" ? "Enviar comprobante por WhatsApp" : "Escribinos por WhatsApp"}
          </a>
          {estado === "rechazado" ? (
            <Link className="btn" style={{ border: "1px solid var(--text-dark)", color: "var(--text-dark)" }} href="/checkout">Intentar de nuevo</Link>
          ) : (
            <Link className="btn" style={{ border: "1px solid var(--text-dark)", color: "var(--text-dark)" }} href="/tienda">Seguir comprando</Link>
          )}
        </div>
        <p style={{ margin: 0, fontSize: 14, color: "var(--muted-dark)" }}>
          {STORE.addressFull} · {STORE.hours}
        </p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <Resultado />
    </Suspense>
  );
}
