// Fotos de referencia de Unsplash (licencia libre, https://unsplash.com/license).
// Son provisorias para el boceto: reemplazarlas por fotos propias de cada producto.
export type PhotoCredit = { src: string; author: string; authorUrl: string; photoUrl: string; alt: string };

export const PRODUCT_PHOTOS: Record<string, PhotoCredit> = {
  "traje-slim-fit-azul-noche": {
    "src": "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8bmF2eSUyMGJsdWUlMjBzdWl0JTIwbWFufGVufDF8MXx8fDE3OTM5MTQyMjd8MA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Mohamad Khosravi",
    "authorUrl": "https://unsplash.com/@mohamadkhosravi?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/man-in-blue-suit-standing-on-sidewalk-during-daytime--eb0moHDPBI?utm_source=mandato&utm_medium=referral",
    "alt": "man in blue suit standing on sidewalk during daytime"
  },
  "traje-clasico-negro": {
    "src": "https://images.unsplash.com/photo-1618886614638-80e3c103d31a?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8YmxhY2slMjBzdWl0JTIwbWFuJTIwZWxlZ2FudHxlbnwxfDF8fHwxNzkzOTE0MjI5fDA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Mohamad Khosravi",
    "authorUrl": "https://unsplash.com/@mohamadkhosravi?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/man-in-black-suit-jacket-and-black-pants-standing-on-gray-concrete-floor-during-daytime-vS0Kya7E5V4?utm_source=mandato&utm_medium=referral",
    "alt": "man in black suit jacket and black pants standing on gray concrete floor during daytime"
  },
  "blazer-camel": {
    "src": "https://images.unsplash.com/photo-1619603364937-8d7af41ef206?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8Y2FtZWwlMjBibGF6ZXIlMjBtZW58ZW58MXwxfHx8MTc5MzkxNDIzMHww&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Taras Chernus",
    "authorUrl": "https://unsplash.com/@chernus_tr?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/man-in-brown-coat-standing--au3XMzfhro?utm_source=mandato&utm_medium=referral",
    "alt": "man in brown coat standing"
  },
  "saco-azul-marino": {
    "src": "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8bmF2eSUyMGJsYXplciUyMG1lbnxlbnwxfDF8fHwxNzkzOTE0MjMxfDA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Mohamad Khosravi",
    "authorUrl": "https://unsplash.com/@mohamadkhosravi?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/man-in-blue-suit-standing-HgyAIYvMWkw?utm_source=mandato&utm_medium=referral",
    "alt": "man in blue suit standing"
  },
  "chaleco-vestir-gris-oxford": {
    "src": "https://images.unsplash.com/photo-1662833595899-07c57d617f56?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8Z3JleSUyMHdhaXN0Y29hdCUyMG1lbnxlbnwxfDF8fHwxNzkzOTE0MjMyfDA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Ernest Flowers",
    "authorUrl": "https://unsplash.com/@ernestflowerss?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/a-man-with-a-beard-and-tie-QTH2Eoo2dgM?utm_source=mandato&utm_medium=referral",
    "alt": "a man with a beard and tie"
  },
  "chaleco-negro": {
    "src": "https://images.unsplash.com/photo-1599725728598-dc7ed109ff89?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8YmxhY2slMjB3YWlzdGNvYXQlMjB2ZXN0JTIwbWVufGVufDF8MXx8fDE3OTM5MTQyMzN8MA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Pedram Normohamadian",
    "authorUrl": "https://unsplash.com/@pedram_normohamadi?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/man-in-black-button-up-shirt-standing-near-brown-brick-wall-daguyNdZFCY?utm_source=mandato&utm_medium=referral",
    "alt": "man in black button up shirt standing near brown brick wall"
  },
  "pantalon-vestir-negro": {
    "src": "https://images.unsplash.com/photo-1618001789159-ffffe6f96ef2?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8Mnx8YmxhY2slMjBkcmVzcyUyMHRyb3VzZXJzJTIwbWVufGVufDF8MXx8fDE3OTM5MTQyMzR8MA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Mohamad Khosravi",
    "authorUrl": "https://unsplash.com/@mohamadkhosravi?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/man-in-white-shirt-and-suspenders-Ll6ggwPpKIo?utm_source=mandato&utm_medium=referral",
    "alt": "A man in a white shirt and black trousers with suspenders outdoors"
  },
  "pantalon-vestir-gris": {
    "src": "https://images.unsplash.com/photo-1627976238251-a0191b91145b?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8Z3JleSUyMHRyb3VzZXJzJTIwbWVufGVufDF8MXx8fDE3OTM5MTQyMzV8MA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Ahmed Sheraz",
    "authorUrl": "https://unsplash.com/@sheraz_official__?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/man-in-black-zip-up-jacket-and-white-pants-Y5-ORenlZbo?utm_source=mandato&utm_medium=referral",
    "alt": "man in black zip up jacket and white pants"
  },
  "pantalon-chino-beige": {
    "src": "https://images.unsplash.com/photo-1621343342498-a0b6a9b40510?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8YmVpZ2UlMjBjaGlub3MlMjBtZW58ZW58MXwxfHx8MTc5MzkxNDIzNnww&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Rodrigo Sümmer",
    "authorUrl": "https://unsplash.com/@rodsimmer?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/man-in-gray-zip-up-jacket-and-white-pants-standing-on-gray-concrete-floor-during-daytime-7HWyBKvcQ8g?utm_source=mandato&utm_medium=referral",
    "alt": "man in gray zip up jacket and white pants standing on gray concrete floor during daytime"
  },
  "camisa-vestir-blanca": {
    "src": "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8d2hpdGUlMjBkcmVzcyUyMHNoaXJ0JTIwbWVufGVufDF8MXx8fDE3OTM5MTQyMzd8MA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Mahdi Bafande",
    "authorUrl": "https://unsplash.com/@mahdibafande?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/man-in-white-dress-shirt-wearing-black-sunglasses-npyWFYpHQ94?utm_source=mandato&utm_medium=referral",
    "alt": "man in white dress shirt wearing black sunglasses"
  },
  "camisa-vestir-celeste": {
    "src": "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8bGlnaHQlMjBibHVlJTIwZHJlc3MlMjBzaGlydHxlbnwxfDF8fHwxNzkzOTE0MjM4fDA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Mohamad Khosravi",
    "authorUrl": "https://unsplash.com/@mohamadkhosravi?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/man-in-blue-dress-shirt-wearing-black-sunglasses-4fkUAduhoSY?utm_source=mandato&utm_medium=referral",
    "alt": "man in blue dress shirt wearing black sunglasses"
  },
  "zapatos-oxford-negros": {
    "src": "https://images.unsplash.com/photo-1632497775897-815042a13216?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8YmxhY2slMjBsZWF0aGVyJTIwc25lYWtlcnN8ZW58MXwxfHx8MTc5MzkxNDI0MHww&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Adrian Regeci",
    "authorUrl": "https://unsplash.com/@regeci?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/a-pair-of-black-shoes-hanging-on-a-wall-4rDug1iO8iA?utm_source=mandato&utm_medium=referral",
    "alt": "a pair of black shoes hanging on a wall"
  },
  "zapatillas-cuero-blancas": {
    "src": "https://images.unsplash.com/photo-1718802312665-d8219d8c64ed?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8Nnx8bWluaW1hbGlzdCUyMGxlYXRoZXIlMjBzbmVha2Vyc3xlbnwxfHx8fDE3OTM5MTQyNzJ8MA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "SJ 📸",
    "authorUrl": "https://unsplash.com/@uxsj_ph?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/a-pair-of-white-shoes-sitting-on-top-of-a-white-table-KVXrW7cN6-g?utm_source=mandato&utm_medium=referral",
    "alt": "A pair of white shoes sitting on top of a white table"
  },
  "corbata-seda-azul": {
    "src": "https://images.unsplash.com/photo-1666852327656-5e9fd213209b?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MTB8fG5lY2t0aWV8ZW58MXx8fHwxNzkzOTE0MjcwfDA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "aung swam nyi",
    "authorUrl": "https://unsplash.com/@aungswamnyi?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/a-man-wearing-a-white-shirt-and-a-tie-8OWcgGeB-Rk?utm_source=mandato&utm_medium=referral",
    "alt": "a man wearing a white shirt and a tie"
  },
  "corbata-seda-negra": {
    "src": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8bmVja3RpZXxlbnwxfHx8fDE3OTM5MTQyNzB8MA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Benjamin R.",
    "authorUrl": "https://unsplash.com/@dapperprofessional?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/man-in-white-dress-shirt-with-black-and-white-polka-dots-necktie-WdhmRPvMn7A?utm_source=mandato&utm_medium=referral",
    "alt": "man in white dress shirt with black and white polka dots necktie"
  },
  "cinturon-cuero-negro": {
    "src": "https://images.unsplash.com/photo-1664286074176-5206ee5dc878?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8bGVhdGhlciUyMGJlbHR8ZW58MXx8fHwxNzkzOTE0MjcxfDA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "seeetz",
    "authorUrl": "https://unsplash.com/@seeetz?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/a-leather-belt-on-a-black-surface-eNEa7Gsfzzs?utm_source=mandato&utm_medium=referral",
    "alt": "a leather belt on a black surface"
  },
  "cinturon-cuero-marron": {
    "src": "https://images.unsplash.com/photo-1624222247344-550fb60583dc?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8N3x8bGVhdGhlciUyMGJlbHR8ZW58MXx8fHwxNzkzOTE0MjcxfDA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "L S",
    "authorUrl": "https://unsplash.com/@ls8?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/brown-leather-belt-with-silver-buckle-KAx7H0jxo28?utm_source=mandato&utm_medium=referral",
    "alt": "brown leather belt with silver buckle"
  },
  "panuelo-bolsillo": {
    "src": "https://images.unsplash.com/photo-1785612155911-0b45fdef17b9?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8cG9ja2V0JTIwc3F1YXJlJTIwc3VpdHxlbnwxfDF8fHwxNzkzOTE0MjQ2fDA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "MOHAMMAD AL JANNAT RAKIN",
    "authorUrl": "https://unsplash.com/@aljannatrakin?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/a-smiling-man-in-a-maroon-suit-and-sunglasses-outdoors-94eQesMqar4?utm_source=mandato&utm_medium=referral",
    "alt": "A smiling man in a maroon suit and sunglasses outdoors"
  },
  "gemelos-plateados": {
    "src": "https://images.unsplash.com/photo-1685392024138-36e7aade79f7?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MXx8Y3VmZmxpbmtzfGVufDF8MXx8fDE3OTM5MTQyNDd8MA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Brittney Weng",
    "authorUrl": "https://unsplash.com/@brittneyweng?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/a-pair-of-gold-cufflinks-sitting-on-top-of-a-piece-of-cloth-7_XrKXM1mms?utm_source=mandato&utm_medium=referral",
    "alt": "a pair of gold cufflinks sitting on top of a piece of cloth"
  },
  "mono-seda-negro": {
    "src": "https://images.unsplash.com/photo-1597136076085-34828af0ff64?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MTF8fG5lY2t0aWV8ZW58MXx8fHwxNzkzOTE0MjcwfDA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Peter Rerko",
    "authorUrl": "https://unsplash.com/@bubibubi_eu?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/black-and-white-box-with-bow-tie-y0TovCS-twc?utm_source=mandato&utm_medium=referral",
    "alt": "black and white box with bow tie"
  },
  "corbata-seda-bordo": {
    "src": "https://images.unsplash.com/photo-1675383094481-3e2088da943b?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MTF8fHRocmVlJTIwcGllY2UlMjBzdWl0fGVufDF8fHx8MTc5MzkxNDI3Mnww&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "nhlakanipho Ndwandwe",
    "authorUrl": "https://unsplash.com/@justnhlaka?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/a-man-in-a-suit-and-red-tie-2hhY4FaKYLY?utm_source=mandato&utm_medium=referral",
    "alt": "a man in a suit and red tie"
  },
  "zapatillas-cuero-negras": {
    "src": "https://images.unsplash.com/photo-1676838179247-6e60dba67d5c?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8MTF8fG1pbmltYWxpc3QlMjBsZWF0aGVyJTIwc25lYWtlcnN8ZW58MXx8fHwxNzkzOTE0MjcyfDA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Zac Wolff",
    "authorUrl": "https://unsplash.com/@zacwolff?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/a-pair-of-black-shoes-sitting-on-top-of-a-table-BDlI_FuKqms?utm_source=mandato&utm_medium=referral",
    "alt": "a pair of black shoes sitting on top of a table"
  },
  "traje-tres-piezas-gris-oxford": {
    "src": "https://images.unsplash.com/photo-1609840170480-4c440bcd5d8f?ixid=M3wxMTI0Njc1fDB8MXxzZWFyY2h8OXx8dGhyZWUlMjBwaWVjZSUyMHN1aXR8ZW58MXx8fHwxNzkzOTE0MjcyfDA&ixlib=rb-4.1.0&w=900&h=1200&fit=crop&crop=entropy&q=80&auto=format",
    "author": "Hamid Tajik",
    "authorUrl": "https://unsplash.com/@hamidtajikph?utm_source=mandato&utm_medium=referral",
    "photoUrl": "https://unsplash.com/photos/man-in-gray-suit-jacket-and-black-pants-standing-on-white-staircase-HRazOEIHLdk?utm_source=mandato&utm_medium=referral",
    "alt": "man in gray suit jacket and black pants standing on white staircase"
  }
};
