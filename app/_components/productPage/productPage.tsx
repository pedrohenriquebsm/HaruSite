"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Apple, ChevronLeft, CreditCard, QrCode } from "lucide-react";
import { useCart } from "../cart/cartContext";
import { useI18n, money } from "@/app/_lib/i18n";
import Shipping from "../shipping/shipping";
import { SPECS, type ProductShape } from "@/app/_data/products";

interface ProductPageProps {
  product: ProductShape;
  collection: ProductShape[];
}

export default function ProductPage({ product, collection }: ProductPageProps) {
  const [active, setActive] = useState(0);
  const { add } = useCart();
  const { t } = useI18n();
  const others = collection.filter((p) => p.slug !== product.slug);
  const specs = SPECS[product.slug] ?? [];

  return (
    <main
      id="main"
      tabIndex={-1}
      className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-5 py-10 md:grid-cols-2"
    >
      <section className="flex flex-col gap-3">
        <figure className="overflow-hidden rounded">
          <Image
            src={product.gallery[active]}
            alt={t(`${product.prefix}.alt`)}
            width={1024}
            height={1024}
            className="w-full object-cover"
          />
        </figure>
        <div className="grid grid-cols-4 gap-2">
          {product.gallery.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`${t("product.view")} ${i + 1}/${product.gallery.length}`}
              className={
                i === active
                  ? "opacity-100 ring-1 ring-olive ring-offset-1"
                  : "opacity-60 hover:opacity-100"
              }
            >
              <Image
                src={src}
                alt=""
                width={256}
                height={256}
                className="w-full rounded object-cover"
              />
            </button>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-3 text-olive-deep">
        <span className="flex items-center gap-1">
          <ChevronLeft strokeWidth={1} size={18} />
          <Link href="/#store" className="font-light text-xs uppercase">
            {t("product.back")}
          </Link>
        </span>
        <p className="text-muted text-xs font-extralight uppercase tracking-widest">
          {t("product.kicker")}
        </p>
        <h1 className="font-[Cormorant_Garamond_Variable] text-3xl font-medium">
          {t(`${product.prefix}.name`)}
        </h1>
        <p className="text-sm">{money(product.price)}</p>
        <p className="font-light">{t(`${product.prefix}.desc`)}</p>

        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => add(product)}
            className="btn btn-outline bg-transparent font-light text-sm uppercase tracking-widest"
          >
            {t("cart.add")}
          </button>
          <button
            type="button"
            onClick={() => {
              add(product);
              // A cesta vive no cabeçalho; abrimos o painel dela (desktop).
              document
                .getElementById("cart-drawer")
                ?.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            }}
            className="btn bg-olive-deep font-light text-sm uppercase tracking-widest text-white"
          >
            {t("product.order")}
          </button>
        </div>

        <dl className="grid gap-4 py-4">
          {specs.map((spec) => (
            <div key={spec.label} className="flex flex-col">
              <dt className="font-extralight">{t(spec.label)}</dt>
              <dd className="font-light">{t(spec.value)}</dd>
            </div>
          ))}
        </dl>

        <Shipping weight={product.weight} />

        <section className="flex flex-col gap-3 border-t pt-4">
          <h2 className="text-sm font-light uppercase">{t("product.pay")}</h2>
          <ul className="flex items-center gap-5">
            <li className="flex items-center gap-1 text-sm">
              <QrCode size={18} />
              <span>{t("product.pix")}</span>
            </li>
            <li className="flex items-center gap-1 text-sm">
              <CreditCard size={18} />
              <span>{t("product.cardPay")}</span>
            </li>
            <li className="flex items-center gap-1 text-sm">
              <Apple size={18} />
              <span>{t("product.applePay")}</span>
            </li>
          </ul>
          <p className="text-sm font-light text-muted">{t("product.payLead")}</p>
        </section>
      </section>

      <section className="md:col-span-2" aria-labelledby="also-title">
        <h2
          id="also-title"
          className="font-[Cormorant_Garamond_Variable] mb-6 text-2xl font-medium"
        >
          {t("product.also")}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {others.map((item) => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className="group flex items-center gap-4"
            >
              <Image
                src={item.gallery[0]}
                alt={t(`${item.prefix}.alt`)}
                width={160}
                height={160}
                className="h-28 w-28 rounded object-cover"
              />
              <span className="flex flex-col gap-1">
                <span className="font-[Cormorant_Garamond_Variable] text-2xl font-medium text-olive-deep">
                  {t(`${item.prefix}.name`)}
                </span>
                <span className="text-sm text-muted">{money(item.price)}</span>
                <span className="text-sm font-light underline underline-offset-4">
                  {t("product.view")}
                </span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
