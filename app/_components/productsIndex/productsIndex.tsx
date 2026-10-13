"use client";

import Product from "../product/product";
import { PRODUCTS } from "@/app/_data/products";
import { useI18n } from "@/app/_lib/i18n";

export default function ProductsIndex() {
  const { t } = useI18n();

  return (
    <main id="main" tabIndex={-1} className="flex flex-col gap-12 px-10 py-16">
      <span className="flex flex-col gap-4">
        <p className="uppercase tracking-widest text-sm font-light">
          {t("shop.kicker")}
        </p>
        <h1 className="font-[Cormorant_Garamond_Variable] text-5xl font-medium">
          {t("shop.title")}
        </h1>
        <p className="max-w-md font-light text-muted">{t("shop.lead")}</p>
      </span>
      <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {PRODUCTS.map((product) => (
          <Product key={product.slug} product={product} />
        ))}
      </div>
    </main>
  );
}
