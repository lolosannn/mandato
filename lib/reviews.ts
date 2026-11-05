// Reseñas reales de clientes (copiadas textual de Google o Instagram, con permiso).
// Mientras la lista esté vacía, la web invita a leer y dejar reseñas en Google.
export type Review = {
  name: string;
  text: string;
  context?: string; // ej: "Alquiler · Casamiento"
  rating?: number; // 1 a 5
};

export const REVIEWS: Review[] = [];
