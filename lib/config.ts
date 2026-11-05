// Datos del negocio. Lo que depende del entorno se toma de variables (ver .env.example).
export const STORE = {
  name: "MANDATO",
  tagline: "Trajes y moda masculina premium",
  since: 2008,
  years: 18,
  address: "Alem 131, Monte Grande",
  addressFull: "Alem 131, Monte Grande, Buenos Aires",
  mapsUrl: "https://maps.google.com/?q=Alem+131+Monte+Grande+Buenos+Aires",
  mapsEmbed:
    "https://www.google.com/maps?q=Alem+131+Monte+Grande+Buenos+Aires&output=embed",
  instagram: "mandatoarg",
  instagramFollowers: "13,7 mil",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || "5491100000000",
  hours: process.env.NEXT_PUBLIC_HORARIOS || "Lun a Sáb · 10 a 13 h y 16 a 20 h",
  // Promos comerciales: ajustar a lo que ofrezca el local.
  installments: 3,
  transferDiscount: 0.1,
  freeShippingFrom: 250000,
  exchangeDays: 30,
  // Reseñas de Google: completar con los datos reales del perfil.
  googleRating: null as number | null,
  googleReviewsCount: null as number | null,
  googleReviewsUrl: "https://www.google.com/maps/search/Mandato+Alem+131+Monte+Grande",
};

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${STORE.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
