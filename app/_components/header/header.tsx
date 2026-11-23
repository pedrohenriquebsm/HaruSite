"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import HeaderNavButtons from "./headerNavButtons";
import ThemeToggle from "../theme/themeToggle";
import LanguageToggle from "../languageToggle/languageToggle";
import CartDrawer from "../cart/cartDrawer";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-40 bg-ivory/85 backdrop-blur-md border-b border-black/5 text-olive-deep transition-colors"
      id="header"
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-12 h-18 flex items-center justify-between">
        {/* Marca HARU */}
        <Link
          href="/#top"
          className="font-[Cormorant_Garamond_Variable] text-2xl font-bold tracking-[0.2em] py-2 text-olive-deep hover:opacity-80 transition-opacity"
        >
          HARU
        </Link>

        {/* Direita: Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="text-xs uppercase tracking-widest gap-8 flex items-center text-muted font-light">
            <HeaderNavButtons />
          </ul>

          <div className="flex items-center gap-1 border-l border-black/10 pl-6">
            <ThemeToggle />
            <LanguageToggle showLabel={false} />
            <CartDrawer id="cart-drawer-desktop" />
          </div>
        </div>

        {/* Direita: Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <CartDrawer id="cart-drawer-mobile" />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn btn-ghost btn-sm p-2 text-olive-deep ml-1"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Menu Dropdown Mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-black/5 bg-ivory/95 px-6 py-6 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <ul className="flex flex-col gap-4 text-xs uppercase tracking-widest text-muted font-light">
            <HeaderNavButtons onItemClick={() => setMobileMenuOpen(false)} />
          </ul>
          <div className="border-t border-black/5 mt-5 pt-4 flex items-center justify-between">
            <span className="text-xs text-muted uppercase tracking-wider font-light">Idioma</span>
            <LanguageToggle />
          </div>
        </div>
      )}
    </header>
  );
}
