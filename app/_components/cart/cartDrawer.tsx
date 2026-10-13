"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "./cartContext";
import { useI18n, money } from "@/app/_lib/i18n";
import { getProduct } from "@/app/_data/products";

export default function CartDrawer({
  id = "cart-drawer",
}: {
  id?: string;
}) {
  const { items, count, total, decrease, increase, remove } = useCart();
  const { t } = useI18n();

  const label = (slug: string) => {
    const product = getProduct(slug);
    return product ? t(`${product.prefix}.name`) : slug;
  };

  return (
    <div className="drawer drawer-end">
      <input id={id} type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor={id}
          className="drawer-button btn bg-transparent hover:bg-transparent border-0 relative"
          aria-label={count > 0 ? `${t("cart.open")} (${count})` : t("cart.open")}
        >
          <ShoppingBag width={15} />
          {count > 0 && (
            <span className="badge badge-sm badge-outline absolute -right-2 -top-2 bg-ivory text-olive-deep">
              {count}
            </span>
          )}
        </label>
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor={id}
          aria-label={t("cart.close")}
          className="drawer-overlay"
        ></label>
        <div
          className="bg-ivory text-text flex min-h-full w-80 flex-col gap-5 p-6"
          data-lenis-prevent
        >
          <div className="flex items-center justify-between">
            <p className="font-[Cormorant_Garamond_Variable] text-3xl font-semibold">
              {t("cart.title")}
            </p>
            <label
              htmlFor={id}
              className="btn btn-ghost btn-sm"
              aria-label={t("cart.close")}
            >
              <X size={16} />
            </label>
          </div>

          {items.length === 0 ? (
            <p className="font-light text-sm">{t("cart.empty")}</p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((line) => (
                <li
                  key={line.slug}
                  className="flex items-center gap-3 border-b pb-3"
                >
                  <Image
                    src={line.image}
                    alt={label(line.slug)}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm">{label(line.slug)}</p>
                    <span className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => decrease(line.slug)}
                        aria-label={`− ${label(line.slug)}`}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm">{line.qty}</span>
                      <button
                        type="button"
                        onClick={() => increase(line.slug)}
                        aria-label={`+ ${label(line.slug)}`}
                      >
                        <Plus size={14} />
                      </button>
                      <span className="ml-auto text-sm">
                        {money(line.price * line.qty)}
                      </span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.slug)}
                    aria-label={`${t("cart.remove")} — ${label(line.slug)}`}
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <>
              <div className="flex justify-between text-sm">
                <span className="font-light">{t("cart.subtotal")}</span>
                <span>{money(total)}</span>
              </div>
              <button
                type="button"
                className="btn bg-olive-deep font-light tracking-widest text-white uppercase text-sm"
              >
                {t("cart.checkout")}
              </button>
              <p className="text-xs font-light text-muted">
                {t("check.stub")}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
