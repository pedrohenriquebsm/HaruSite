"use client";

import Product from "../product/product";
import { PRODUCTS } from "@/app/_data/products";
import { useI18n } from "@/app/_lib/i18n";

export default function ProductsGallery() {
  const { t } = useI18n();

  return (
    <section className="md:mt-10 p-10" id="store">
      <span className="flex flex-col gap-10 py-15">
        <p className="uppercase tracking-widest text-sm font-light">
          {t("shop.kicker")}
        </p>
        <p className="font-[Cormorant_Garamond_Variable] text-5xl font-medium">
          {t("shop.title")}
        </p>
      </span>
      <span className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-10">
        {PRODUCTS.map((product) => (
          <Product key={product.slug} product={product} />
        ))}
      </span>
    </section>
  );
}
