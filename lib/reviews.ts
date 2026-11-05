// Reseñas reales de clientes, copiadas textual del perfil de Google de Mandato.
// Para agregar una nueva, sumá un objeto a la lista (se muestra sola en la tira de la home).
export type Review = {
  name: string;
  text: string;
  context?: string; // ej: "Local Guide · 166 opiniones"
  rating?: number; // 1 a 5
};

export const REVIEWS: Review[] = [
  {
    name: "Leonardo Giannotti",
    text: "La atención es realmente personalizada, son muy amables. Tienen muy linda ropa y a precios razonables. Siempre vuelvo porque es todo lo que busco a la hora de comprar ropa!!!",
    context: "Local Guide",
    rating: 5,
  },
  {
    name: "Paula Bañon",
    text: "Excelente lugar! Variedad, calidad y precio…el local es muy grande y cómodo para su recorrido. El personal muy atento y dispuesto a ayudarte en tu objetivo. Podes pagar con efectivo, débito y crédito. Fuimos con los peques (que son algo inquietos) y nos atendieron de 10. Lo recomiendo…para hacer regalos o mimarse a uno mismo :)",
    context: "Local Guide",
    rating: 5,
  },
  {
    name: "Catalina Valenzuela",
    text: "Excelente atención muy amables y buen asesoramiento los chicos de Mandatos Monte Grande",
    context: "Local Guide",
    rating: 5,
  },
  {
    name: "Daniel Ochoa",
    text: "Excelente atención, todo de muy calidad.",
    context: "Local Guide",
    rating: 5,
  },
  {
    name: "Nancy Arballo",
    text: "Genial, muy amables y uno se siente cómodo comprando, y ah buenos precios!",
    rating: 5,
  },
  {
    name: "Walter Geier",
    text: "Excelente atención y gran variedad! Y encima cumplió 10 años! Felicidades! 👏👏👏",
    context: "Local Guide",
    rating: 5,
  },
  {
    name: "Damian Leithold",
    text: "El lugar es agradable, al igual que los vendedores. La ropa es de buena calidad y con precios accesibles.",
    context: "Local Guide",
    rating: 5,
  },
  {
    name: "Martin Soto",
    text: "Muy buena ropa y excelente atención… Gracias Ezequiel…",
    rating: 5,
  },
  {
    name: "Guillermo Benedetto",
    text: "Buena propuesta comercial. Atención muy cordial. Lo recomiendo.",
    rating: 5,
  },
];
