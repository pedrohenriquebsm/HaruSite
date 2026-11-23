"use client";

import { useState, useEffect, useRef, useCallback, type MouseEvent, type TouchEvent, type KeyboardEvent } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useI18n } from "@/app/_lib/i18n";

export interface ReelImage {
  src: string;
  altKey: string;
}

interface EssayReelProps {
  images: ReelImage[];
  dwellMs?: number;
}

export default function EssayReel({ images, dwellMs = 2500 }: EssayReelProps) {
  const [current, setCurrent] = useState(0);
  const [isHeld, setIsHeld] = useState(false);
  const { t } = useI18n();

  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const count = images.length;

  const show = useCallback(
    (index: number) => {
      setCurrent(((index % count) + count) % count);
    },
    [count],
  );

  const step = useCallback(
    (dir: number) => {
      show(current + dir);
    },
    [current, show],
  );

  // Intervalo automático de 2,5 segundos
  useEffect(() => {
    if (isHeld || count < 2) return;
    const interval = setInterval(() => {
      step(1);
    }, dwellMs);
    return () => clearInterval(interval);
  }, [isHeld, count, dwellMs, step]);

  // Navegação por clique nos 36% das laterais
  const handleStageClick = (e: MouseEvent<HTMLDivElement>) => {
    // Se clicou diretamente nos botões ou dots, ignora
    if ((e.target as HTMLElement).closest("button")) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    if (x < rect.width * 0.36) {
      step(-1);
    } else if (x > rect.width * 0.64) {
      step(1);
    }
  };

  // Navegação por teclado
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      step(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      step(1);
    }
  };

  // Suporte a swipe em touchscreens
  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    setIsHeld(true);
  };

  const handleTouchEnd = (e: TouchEvent<HTMLDivElement>) => {
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    setIsHeld(false);
    if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy)) {
      step(dx < 0 ? 1 : -1);
    }
  };

  return (
    <figure
      ref={containerRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHeld(true)}
      onMouseLeave={() => setIsHeld(false)}
      onFocus={() => setIsHeld(true)}
      onBlur={() => setIsHeld(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-label="Carrossel de fotografias da matéria"
      className="reveal relative overflow-hidden rounded-xl bg-black/5 aspect-[16/10] w-full select-none group focus:outline-none focus:ring-2 focus:ring-olive"
    >
      {/* Mídia com crossfade */}
      <div
        onClick={handleStageClick}
        className="relative w-full h-full cursor-pointer"
      >
        {images.map((img, i) => (
          <Image
            key={img.src}
            src={img.src}
            alt={t(img.altKey)}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
            className={`object-cover transition-opacity duration-700 ease-in-out ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          />
        ))}
      </div>

      {/* Botões de navegação lateral (Anterior / Próxima) */}
      <div className="absolute inset-y-0 left-3 flex items-center z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            step(-1);
          }}
          aria-label={t("essay.reel.prev")}
          className="btn btn-circle btn-sm bg-white/70 backdrop-blur-sm border-0 text-olive-deep hover:bg-white pointer-events-auto shadow-md"
        >
          <ChevronLeft size={18} />
        </button>
      </div>

      <div className="absolute inset-y-0 right-3 flex items-center z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            step(1);
          }}
          aria-label={t("essay.reel.next")}
          className="btn btn-circle btn-sm bg-white/70 backdrop-blur-sm border-0 text-olive-deep hover:bg-white pointer-events-auto shadow-md"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Indicadores de bolinhas (Dots) */}
      <div className="absolute bottom-3 inset-x-0 flex justify-center items-center gap-2 z-20 pointer-events-auto">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              show(i);
            }}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === current ? "true" : undefined}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current
                ? "w-6 bg-white shadow-md"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </figure>
  );
}
