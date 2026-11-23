"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const root = document.documentElement;
    root.classList.add("js-motion");

    let lenis: Lenis | null = (window as unknown as { haruLenis?: Lenis })
      .haruLenis ?? null;
    const scrollTriggerUpdate = () => ScrollTrigger.update();
    const syncLenis = () => {
      if (lenis) lenis.on("scroll", scrollTriggerUpdate);
    };
    const unsyncLenis = () => {
      if (lenis) lenis.off("scroll", scrollTriggerUpdate);
    };
    syncLenis();

    const onLenisReady = (event: Event) => {
      lenis = (event as CustomEvent<Lenis>).detail;
      syncLenis();
    };
    window.addEventListener("haru:lenis-ready", onLenisReady);

    // Espera a renderização do React assentar
    const timer = setTimeout(() => {
      const elements = gsap.utils.toArray<HTMLElement>(".reveal");

      elements.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            toggleActions: "play none none none",
          },
        });
      });

      ScrollTrigger.refresh();
    }, 120);

    return () => {
      clearTimeout(timer);
      unsyncLenis();
      window.removeEventListener("haru:lenis-ready", onLenisReady);
      ScrollTrigger.getAll().forEach((st) => {
        if (st.vars.trigger && (st.vars.trigger as HTMLElement).classList?.contains("reveal")) {
          st.kill();
        }
      });
    };
  }, [pathname]);

  return null;
}
