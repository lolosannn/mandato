import type { Metadata } from "next";
import { STORE, whatsappLink } from "@/lib/config";
import { money } from "@/lib/format";

export const metadata: Metadata = {
  title: "Ayuda",
  description: "Envíos con Andreani, cambios y devoluciones, guía de talles y medios de pago.",
};

export default function Ayuda() {
  return (
    <section className="section" style={{ paddingTop: 56 }}>
      <div className="wrap">
        <p className="eyebrow">Ayuda</p>
        <h1 className="display h2" style={{ marginTop: 12 }}>Comprá con tranquilidad</h1>
        <div className="prose">
          <h2 id="envios">Envíos con Andreani</h2>
          <p>
            Enviamos a todo el país con Andreani, a domicilio o a sucursal. El costo se calcula con tu código postal en la ficha del producto, en el carrito o al finalizar la compra.
            Las compras desde {money(STORE.freeShippingFrom)} tienen envío gratis. Despachamos dentro de las 48 h hábiles de acreditado el pago y te enviamos el número de seguimiento por email.
          </p>
          <p>También podés retirar sin cargo en {STORE.addressFull} ({STORE.hours}).</p>

          <h2 id="cambios">Cambios y devoluciones</h2>
          <p>
            Tenés {STORE.exchangeDays} días desde que recibís tu compra para cambiar talle o color, con la prenda sin uso y con etiqueta. El cambio en el local no tiene costo.
            Si preferís hacerlo por envío, escribinos por <a href={whatsappLink("Hola Mandato! Quiero hacer un cambio.")} target="_blank" rel="noopener">WhatsApp</a> y te indicamos cómo.
          </p>
          <p>
            Por la Ley de Defensa del Consumidor, en compras online tenés 10 días corridos para arrepentirte de la compra (botón de arrepentimiento).
          </p>

          <h2 id="talles">Guía de talles</h2>
          <p>Medidas orientativas del saco. Si tenés dudas, un asesor te ayuda por WhatsApp o en el local.</p>
          <div className="table-scroll">
            <table>
              <thead>
                <tr><th>Talle</th><th>Pecho (cm)</th><th>Cintura (cm)</th><th>Camisa</th></tr>
              </thead>
              <tbody>
                {[
                  ["44", "88–92", "76–80", "38"],
                  ["46", "92–96", "80–84", "39"],
                  ["48", "96–100", "84–88", "40"],
                  ["50", "100–104", "88–92", "41"],
                  ["52", "104–108", "92–96", "42"],
                  ["54", "108–112", "96–100", "43"],
                  ["56", "112–116", "100–104", "44"],
                ].map((r) => (
                  <tr key={r[0]}>{r.map((c, i) => <td key={i}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 id="pagos">Medios de pago</h2>
          <p>
            Tarjetas de crédito y débito y dinero en cuenta a través de Mercado Pago, con {STORE.installments} cuotas sin interés.
            Transferencia bancaria con {Math.round(STORE.transferDiscount * 100)}% de descuento. Nunca guardamos los datos de tu tarjeta.
          </p>
        </div>
      </div>
    </section>
  );
}
