// Prefija rutas de /public con el basePath (necesario en GitHub Pages: /mandato/...).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
export const IS_STATIC = process.env.NEXT_PUBLIC_STATIC === "1";

export function asset(path: string) {
  return `${BASE_PATH}${path}`;
}
