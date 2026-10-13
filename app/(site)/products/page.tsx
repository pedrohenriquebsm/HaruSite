import type { Metadata } from "next";
import ProductsIndex from "@/app/_components/productsIndex/productsIndex";

export const metadata: Metadata = {
  title: "HARU — Coleção",
  description:
    "Escova de bambu, kit de duas e suporte de diatomito. Higiene feita de matéria, não de plástico.",
};

export default function Products() {
  return <ProductsIndex />;
}
