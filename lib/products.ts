// Catálogo de la tienda.
// IMPORTANTE: precios, talles y descripciones son de ejemplo para armar la web.
// Reemplazarlos por los reales antes de publicar. Para agregar fotos, subirlas a
// /public/productos/ y poner la ruta en `images` (ej: "/productos/traje-azul-1.jpg").

export type CategoryId = "trajes" | "sacos" | "camisas" | "accesorios";

export const CATEGORIES: { id: CategoryId; name: string; description: string }[] = [
  { id: "trajes", name: "Trajes", description: "Slim fit, clásicos y de tres piezas." },
  { id: "sacos", name: "Sacos y blazers", description: "Para el día a día o un evento." },
  { id: "camisas", name: "Camisas", description: "De vestir, lisas y con textura." },
  { id: "accesorios", name: "Corbatas y accesorios", description: "El detalle que completa el look." },
];

export type Color = { name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  category: CategoryId;
  price: number;
  rentalPrice?: number; // si se ofrece en alquiler
  colors: Color[];
  sizes: string[];
  soldOut?: string[];
  tag?: "Nuevo" | "Más vendido" | "Oferta";
  description: string;
  details: string[];
  weightKg: number; // para cotizar el envío
  images: string[];
  featured?: boolean;
  pairsWith?: string[];
};

const SUIT_SIZES = ["44", "46", "48", "50", "52", "54", "56"];
const SHIRT_SIZES = ["38", "39", "40", "41", "42", "43", "44"];

export const PRODUCTS: Product[] = [
  {
    slug: "traje-slim-fit-azul-noche",
    name: "Traje Slim Fit Azul Noche",
    category: "trajes",
    price: 389000,
    rentalPrice: 75000,
    colors: [
      { name: "Azul noche", hex: "#1C2433" },
      { name: "Gris oxford", hex: "#4A4A4C" },
      { name: "Negro", hex: "#111111" },
    ],
    sizes: SUIT_SIZES,
    soldOut: ["56"],
    tag: "Nuevo",
    description:
      "Corte entallado que estiliza la figura sin perder comodidad. El traje que funciona igual de bien en una reunión importante que en un casamiento de noche.",
    details: ["Saco de dos botones con solapa clásica", "Pantalón de tiro medio sin pinzas", "Forrería completa", "Tintorería recomendada"],
    weightKg: 1.8,
    images: [],
    featured: true,
    pairsWith: ["camisa-vestir-blanca", "corbata-seda-bordo", "cinturon-cuero-negro"],
  },
  {
    slug: "traje-tres-piezas-gris-oxford",
    name: "Traje Tres Piezas Gris Oxford",
    category: "trajes",
    price: 459000,
    rentalPrice: 90000,
    colors: [
      { name: "Gris oxford", hex: "#4A4A4C" },
      { name: "Azul marino", hex: "#1F2A44" },
    ],
    sizes: SUIT_SIZES,
    description:
      "Saco, chaleco y pantalón. La pieza más formal de la colección, pensada para el hombre que quiere marcar presencia.",
    details: ["Chaleco de cinco botones", "Saco de dos botones", "Pantalón con pinza simple", "Tintorería recomendada"],
    weightKg: 2.2,
    images: [],
    featured: true,
    pairsWith: ["camisa-vestir-celeste", "corbata-seda-azul", "panuelo-bolsillo"],
  },
  {
    slug: "traje-clasico-negro",
    name: "Traje Clásico Negro",
    category: "trajes",
    price: 359000,
    rentalPrice: 70000,
    colors: [{ name: "Negro", hex: "#111111" }],
    sizes: SUIT_SIZES,
    tag: "Más vendido",
    description:
      "El básico que todo hombre necesita en el placard. Corte regular, impecable para eventos de noche y ceremonias.",
    details: ["Saco de un botón", "Pantalón recto", "Forrería completa", "Tintorería recomendada"],
    weightKg: 1.8,
    images: [],
    pairsWith: ["camisa-vestir-blanca", "corbata-seda-negra", "cinturon-cuero-negro"],
  },
  {
    slug: "blazer-camel",
    name: "Blazer de Vestir Camel",
    category: "sacos",
    price: 239000,
    colors: [
      { name: "Camel", hex: "#B08A5B" },
      { name: "Azul marino", hex: "#1F2A44" },
    ],
    sizes: SUIT_SIZES,
    tag: "Más vendido",
    featured: true,
    description:
      "Elegancia sin traje completo. Combinalo con jean oscuro o pantalón de vestir para un look smart casual con autoridad.",
    details: ["Dos botones", "Bolsillos con cartera", "Media forrería", "Tintorería recomendada"],
    weightKg: 1.1,
    images: [],
    pairsWith: ["camisa-vestir-celeste", "panuelo-bolsillo", "cinturon-cuero-marron"],
  },
  {
    slug: "saco-azul-marino",
    name: "Saco Azul Marino",
    category: "sacos",
    price: 219000,
    colors: [{ name: "Azul marino", hex: "#1F2A44" }],
    sizes: SUIT_SIZES,
    description: "El saco más versátil: de la oficina a la cena sin cambiarte.",
    details: ["Dos botones", "Corte entallado", "Media forrería"],
    weightKg: 1.1,
    images: [],
    pairsWith: ["camisa-vestir-blanca", "corbata-seda-bordo"],
  },
  {
    slug: "camisa-vestir-blanca",
    name: "Camisa de Vestir Blanca",
    category: "camisas",
    price: 69000,
    colors: [{ name: "Blanca", hex: "#F5F5F2" }],
    sizes: SHIRT_SIZES,
    featured: true,
    description: "Algodón de trama fina, cuello italiano y puño simple. La base de cualquier traje.",
    details: ["100% algodón", "Cuello italiano", "Slim fit", "Lavar a mano o en ciclo delicado"],
    weightKg: 0.3,
    images: [],
    pairsWith: ["corbata-seda-bordo", "gemelos-plateados"],
  },
  {
    slug: "camisa-vestir-celeste",
    name: "Camisa de Vestir Celeste",
    category: "camisas",
    price: 69000,
    colors: [{ name: "Celeste", hex: "#BFD3E6" }],
    sizes: SHIRT_SIZES,
    description: "Un celeste suave que ilumina el rostro y combina con trajes grises y azules.",
    details: ["100% algodón", "Cuello italiano", "Slim fit"],
    weightKg: 0.3,
    images: [],
    pairsWith: ["corbata-seda-azul"],
  },
  {
    slug: "corbata-seda-bordo",
    name: "Corbata de Seda Bordó",
    category: "accesorios",
    price: 32000,
    colors: [{ name: "Bordó", hex: "#5E1A22" }],
    sizes: ["Único"],
    description: "Seda con textura sutil. Un clásico que nunca falla.",
    details: ["Seda", "Ancho 7 cm"],
    weightKg: 0.1,
    images: [],
  },
  {
    slug: "corbata-seda-azul",
    name: "Corbata de Seda Azul",
    category: "accesorios",
    price: 32000,
    colors: [{ name: "Azul", hex: "#1F3B6B" }],
    sizes: ["Único"],
    description: "Azul profundo para trajes grises o celestes.",
    details: ["Seda", "Ancho 7 cm"],
    weightKg: 0.1,
    images: [],
  },
  {
    slug: "corbata-seda-negra",
    name: "Corbata de Seda Negra",
    category: "accesorios",
    price: 32000,
    colors: [{ name: "Negra", hex: "#111111" }],
    sizes: ["Único"],
    description: "Para eventos de etiqueta y ceremonias de noche.",
    details: ["Seda", "Ancho 6 cm"],
    weightKg: 0.1,
    images: [],
  },
  {
    slug: "cinturon-cuero-negro",
    name: "Cinturón de Cuero Negro",
    category: "accesorios",
    price: 45000,
    colors: [{ name: "Negro", hex: "#111111" }],
    sizes: ["90", "95", "100", "105", "110"],
    description: "Cuero vacuno con hebilla plateada mate.",
    details: ["Cuero vacuno", "Ancho 3,5 cm"],
    weightKg: 0.25,
    images: [],
  },
  {
    slug: "cinturon-cuero-marron",
    name: "Cinturón de Cuero Marrón",
    category: "accesorios",
    price: 45000,
    colors: [{ name: "Marrón", hex: "#5A3A22" }],
    sizes: ["90", "95", "100", "105", "110"],
    description: "Para looks en tonos tierra, camel y azul.",
    details: ["Cuero vacuno", "Ancho 3,5 cm"],
    weightKg: 0.25,
    images: [],
  },
  {
    slug: "panuelo-bolsillo",
    name: "Pañuelo de Bolsillo",
    category: "accesorios",
    price: 18000,
    colors: [
      { name: "Blanco", hex: "#F5F5F2" },
      { name: "Bordó", hex: "#5E1A22" },
    ],
    sizes: ["Único"],
    description: "El detalle que distingue a quien sabe vestirse.",
    details: ["Seda", "30 × 30 cm"],
    weightKg: 0.05,
    images: [],
  },
  {
    slug: "gemelos-plateados",
    name: "Gemelos Plateados",
    category: "accesorios",
    price: 38000,
    colors: [{ name: "Plateado", hex: "#B9BBBE" }],
    sizes: ["Único"],
    description: "Gemelos de acero con terminación satinada, en estuche.",
    details: ["Acero", "Incluye estuche"],
    weightKg: 0.1,
    images: [],
  },
];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategory(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}
