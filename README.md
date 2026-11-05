# MANDATO · Tienda online

E-commerce de MANDATO (trajes y moda masculina premium, Alem 131, Monte Grande).
Hecho con Next.js (App Router) y TypeScript, sin base de datos.

## Qué incluye

- **Home** con los valores de la marca (status, seguridad, mejor versión, 18 años), destacados, alquiler, reseñas y ubicación.
- **Tienda** con filtro por categoría y **ficha de producto** (color, talle, cantidad, calculador de envío).
- **Carrito** guardado en el navegador.
- **Checkout** con:
  - entrega: retiro en el local, Andreani a domicilio o a sucursal;
  - pago: Mercado Pago Checkout Pro (tarjetas en cuotas y dinero en cuenta) o transferencia con descuento.
- **Turnos**: el cliente elige servicio, día y horario, y se abre WhatsApp con el turno ya escrito.
- **Alquiler**, **Ayuda** (envíos, cambios, talles, pagos) y botón flotante de WhatsApp.

## Correr en local

```bash
npm install
cp .env.example .env.local   # completar los datos
npm run dev                  # http://localhost:3000
```

## Dónde se editan las cosas

| Qué | Archivo |
| --- | --- |
| Productos, precios, talles, fotos | `lib/products.ts` (fotos en `public/productos/`) |
| Datos del local, cuotas, descuento, envío gratis, días de cambio, nota de Google | `lib/config.ts` |
| Reseñas reales | `lib/reviews.ts` |
| Tarifas de envío de respaldo | `lib/shipping.ts` |
| Horarios de turnos | `components/Booking.tsx` (`SLOTS`) |
| Colores y estilos | `app/globals.css` |

## Integraciones

- **Mercado Pago**: cargar `MP_ACCESS_TOKEN` (con un token `TEST-...` se usa el modo de prueba).
  Los precios se recalculan en el servidor. Las notificaciones llegan a `/api/mercadopago/webhook`.
  Para eso `NEXT_PUBLIC_SITE_URL` tiene que ser la URL pública con https.
- **Andreani**: con `ANDREANI_CLIENTE` y los contratos cargados, cotiza con la API de Andreani.
  Sin esas variables usa la tabla de `lib/shipping.ts` (AMBA / interior).
- **Transferencia**: `TRANSFER_ALIAS`, `TRANSFER_CBU` y `TRANSFER_TITULAR` se muestran al confirmar.

## Deploy

Recomendado: Vercel. Se importa el repo, se cargan las variables de `.env.example` y listo.

## Vista previa en GitHub Pages

El workflow `.github/workflows/pages.yml` publica una versión estática en
`https://<usuario>.github.io/mandato/` en cada push. Como Pages no tiene servidor:
el envío se calcula con la tabla de respaldo, el pago con Mercado Pago queda deshabilitado
(funciona la transferencia) y los turnos van por WhatsApp. Para activarlo:
**Settings → Pages → Source: GitHub Actions**.
