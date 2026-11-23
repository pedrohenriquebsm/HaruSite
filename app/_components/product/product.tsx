"use client";

import { useState, useRef, type MouseEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useI18n, money } from "@/app/_lib/i18n";
import type { ProductShape } from "@/app/_data/products";

export default function Product({ product }: { product: ProductShape }) {
  const { t } = useI18n();
  const [activePhoto, setActivePhoto] = useState(0);
  const mediaRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!mediaRef.current || product.gallery.length < 2) return;
    const rect = mediaRef.current.getBoundingClientRect();
    if (!rect.width) return;
    const x = Math.min(0.999, Math.max(0, (e.clientX - rect.left) / rect.width));
    const nextIndex = Math.min(
      product.gallery.length - 1,
      Math.floor(x * product.gallery.length),
    );
    if (nextIndex !== activePhoto) {
      setActivePhoto(nextIndex);
    }
  };

  const handleMouseLeave = () => {
    setActivePhoto(0);
  };

  return (
    <article className="reveal flex flex-col group w-full max-w-sm transition-transform duration-300">
      <Link
        href={`/products/${product.slug}`}
        className="block relative overflow-hidden rounded-lg bg-black/5 aspect-square"
      >
        <div
          ref={mediaRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-full cursor-pointer select-none"
        >
          {product.gallery.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={t(`${product.prefix}.alt`)}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className={`object-cover transition-opacity duration-200 ${
                i === activePhoto ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
              }`}
              priority={i === 0}
            />
          ))}

          {/* Indicadores de scrub discretos no hover */}
          {product.gallery.length > 1 && (
            <div className="absolute bottom-2 left-0 right-0 z-20 flex justify-center gap-1.5 opacity-0 group-hover:opacity-80 transition-opacity">
              {product.gallery.map((_, i) => (
                <span
                  key={i}
                  className={`h-1 rounded-full transition-all duration-150 ${
                    i === activePhoto
                      ? "w-4 bg-white shadow-sm"
                      : "w-1.5 bg-white/50"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="flex flex-col gap-1.5 pt-4">
        <h3 className="font-[Cormorant_Garamond_Variable] text-2xl font-medium">
          <Link
            href={`/products/${product.slug}`}
            className="hover:underline underline-offset-4"
          >
            {t(`${product.prefix}.name`)}
          </Link>
        </h3>
        <p className="text-xs text-muted font-light leading-relaxed min-h-[2.5rem]">
          {t(`${product.prefix}.meta`)}
        </p>
        <div className="flex items-center justify-between pt-2 mt-auto">
          <span className="font-medium text-sm text-olive-deep">
            {money(product.price)}
          </span>
          <Link
            href={`/products/${product.slug}`}
            className="text-xs uppercase tracking-widest text-olive hover:text-olive-deep underline underline-offset-4 font-light"
          >
            {t("product.view")}
          </Link>
        </div>
      </div>
    </article>
  );
}
