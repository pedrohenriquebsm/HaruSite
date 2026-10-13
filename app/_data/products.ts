import { asset } from "@/app/_lib/assets";

/**
 * O catálogo guarda apenas dados que não mudam com o idioma (slug, preço,
 * galeria). Nome, descrições, textos alternativos e especificações vêm de
 * `_data/translations.json` pela chave `prefix.*`, para acompanhar o seletor de
 * idioma sem duplicar conteúdo.
 */
export interface ProductShape {
  slug: string;
  prefix: "p1" | "p2" | "p3";
  price: number;
  /** Peso relativo usado no frete (mesmo `data-weight` do site antigo). */
  weight: number;
  gallery: string[];
}

export interface SpecShape {
  /** Chave do rótulo, ex.: `spec.handle`. */
  label: string;
  /** Chave do valor, ex.: `p1.handle`. */
  value: string;
}

export const PRODUCTS: ProductShape[] = [
  {
    slug: "escova",
    prefix: "p1",
    price: 48,
    weight: 1,
    gallery: [
      asset("/background/product-escova.jpg"),
      asset("/background/product-escova-2.jpg"),
      asset("/background/product-escova-3.jpg"),
      asset("/background/product-escova-4.jpg"),
    ],
  },
  {
    slug: "kit",
    prefix: "p2",
    price: 86,
    weight: 2,
    gallery: [
      asset("/background/product-kit.jpg"),
      asset("/background/product-kit-2.jpg"),
      asset("/background/product-kit-3.jpg"),
      asset("/background/product-kit-4.jpg"),
    ],
  },
  {
    slug: "suporte",
    prefix: "p3",
    price: 62,
    weight: 3,
    gallery: [
      asset("/background/product-suporte.jpg"),
      asset("/background/product-suporte-2.jpg"),
      asset("/background/product-suporte-3.jpg"),
    ],
  },
];

/** Especificações na mesma ordem da página de produto da V6.0. */
export const SPECS: Record<string, SpecShape[]> = {
  escova: [
    { label: "spec.handle", value: "p1.handle" },
    { label: "spec.bristle", value: "p1.bristle" },
    { label: "spec.care", value: "p1.care" },
  ],
  kit: [
    { label: "spec.handle", value: "p2.handle" },
    { label: "spec.bristle", value: "p2.bristle" },
    { label: "spec.care", value: "p2.care" },
  ],
  suporte: [
    { label: "spec.handle", value: "p3.handle" },
    { label: "spec.bristle", value: "p3.bristle" },
    { label: "spec.care", value: "p3.care" },
  ],
};

export function getProduct(slug: string): ProductShape | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
