import type { Metadata, Viewport } from "next";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SITE_URL, STORE } from "@/lib/config";
import { asset } from "@/lib/asset";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "MANDATO · Trajes y moda masculina premium en Monte Grande",
    template: "%s · MANDATO",
  },
  description: `Trajes, sacos y camisas en venta y alquiler. ${STORE.years} años vistiendo a hombres que marcan la diferencia. Envíos a todo el país con Andreani. ${STORE.address}.`,
  icons: { icon: asset("/img/logo-colibri.png") },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: "MANDATO",
    images: [asset("/img/local-noche.webp")],
  },
};

export const viewport: Viewport = { themeColor: "#0D0D0D" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: "MANDATO",
  description: STORE.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Alem 131",
    addressLocality: "Monte Grande",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  sameAs: [`https://instagram.com/${STORE.instagram}`],
  image: `${SITE_URL}/img/local-noche.webp`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..700;1,6..96,400..700&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500&family=Jost:wght@300;400;500;600&display=swap"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
