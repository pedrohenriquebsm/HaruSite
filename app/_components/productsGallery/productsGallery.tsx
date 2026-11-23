"use client";

import Product from "../product/product";
import { PRODUCTS } from "@/app/_data/products";
import { useI18n } from "@/app/_lib/i18n";

export default function ProductsGallery() {
  const { t } = useI18n();

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto" id="loja">
      {/* Âncora alternativa para compatibilidade com rotas em inglês / links antigos */}
      <div id="store" className="-translate-y-24" />

      <div className="flex flex-col gap-3 mb-16 text-center md:text-left">
        <p className="reveal uppercase tracking-widest text-xs font-light text-muted">
          {t("shop.kicker")}
        </p>
        <h2 className="reveal font-[Cormorant_Garamond_Variable] text-5xl md:text-6xl font-medium text-olive-deep">
          {t("shop.title")}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 justify-items-center">
        {PRODUCTS.map((product) => (
          <Product key={product.slug} product={product} />
        ))}
      </div>
    </section>
  );
}
