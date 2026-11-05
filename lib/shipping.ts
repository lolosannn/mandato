import { STORE } from "./config";

export type ShippingMethod = "domicilio" | "sucursal" | "retiro";

export type ShippingQuote = {
  method: ShippingMethod;
  title: string;
  description: string;
  price: number;
  estimated: boolean; // true si viene de la tabla de respaldo y no de Andreani
};

export type ShippingItem = { weightKg: number; price: number; quantity: number };

// Tabla de respaldo (en ARS) para cuando no hay credenciales de Andreani configuradas.
// Ajustar a las tarifas que maneje el local.
const FALLBACK = {
  amba: { domicilio: 9500, sucursal: 7500 },
  interior: { domicilio: 14500, sucursal: 11500 },
  extraPorKg: 1200, // por cada kg por encima de 2 kg
};

export function isValidCP(cp: string) {
  return /^\d{4}$/.test(cp);
}

// CP de AMBA: Capital (1000–1499) y Gran Buenos Aires (1600–1999 aprox.).
function isAMBA(cp: number) {
  return (cp >= 1000 && cp <= 1499) || (cp >= 1600 && cp <= 1999);
}

function totals(items: ShippingItem[]) {
  const kilos = items.reduce((s, i) => s + i.weightKg * i.quantity, 0);
  const value = items.reduce((s, i) => s + i.price * i.quantity, 0);
  return { kilos: Math.max(kilos, 0.5), value };
}

async function andreaniQuote(
  cp: string,
  contrato: string,
  items: ShippingItem[],
): Promise<number | null> {
  const cliente = process.env.ANDREANI_CLIENTE;
  if (!cliente || !contrato) return null;
  const { kilos, value } = totals(items);
  const params = new URLSearchParams({
    cpDestino: cp,
    contrato,
    cliente,
    "bultos[0][valorDeclarado]": String(Math.round(value)),
    "bultos[0][kilos]": kilos.toFixed(2),
    // Volumen aproximado de una caja de traje (cm³)
    "bultos[0][volumen]": String(Math.round(6000 * Math.max(1, kilos / 2))),
  });
  try {
    const res = await fetch(`https://apis.andreani.com/v1/tarifas?${params}`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    const total = Number(data?.tarifaConIva?.total);
    return Number.isFinite(total) && total > 0 ? total : null;
  } catch {
    return null;
  }
}

export async function quoteShipping(cp: string, items: ShippingItem[]): Promise<ShippingQuote[]> {
  const { kilos, value } = totals(items);
  const free = value >= STORE.freeShippingFrom;
  const zone = isAMBA(Number(cp)) ? FALLBACK.amba : FALLBACK.interior;
  const extra = Math.max(0, Math.ceil(kilos - 2)) * FALLBACK.extraPorKg;

  const [dom, suc] = await Promise.all([
    andreaniQuote(cp, process.env.ANDREANI_CONTRATO_DOMICILIO || "", items),
    andreaniQuote(cp, process.env.ANDREANI_CONTRATO_SUCURSAL || "", items),
  ]);

  return [
    {
      method: "domicilio",
      title: "Andreani a domicilio",
      description: isAMBA(Number(cp)) ? "Llega en 2 a 4 días hábiles" : "Llega en 3 a 7 días hábiles",
      price: free ? 0 : dom ?? zone.domicilio + extra,
      estimated: dom === null,
    },
    {
      method: "sucursal",
      title: "Andreani a sucursal",
      description: "Retirás en la sucursal Andreani más cercana",
      price: free ? 0 : suc ?? zone.sucursal + extra,
      estimated: suc === null,
    },
    {
      method: "retiro",
      title: "Retiro en el local",
      description: `${STORE.address} · Te avisamos cuando esté listo`,
      price: 0,
      estimated: false,
    },
  ];
}
