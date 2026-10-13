import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./_components/smoothScroll/smoothScroll";
import { I18nProvider } from "./_lib/i18n";
import { CartProvider } from "./_components/cart/cartContext";
import SkipLink from "./_components/skipLink/skipLink";
import { asset } from "./_lib/assets";

export const metadata: Metadata = {
  title: "Haru — Higiene feita de matéria, não de plástico",
  description:
    "HARU. Higiene feita de matéria, não de plástico — bambu e crina de cavalo.",
  icons: [
    { rel: "icon", url: asset("/logos/favicon.png"), type: "image/png" },
    { rel: "apple-touch-icon", url: asset("/logos/favicon.png") },
  ],
};

/**
 * Aplica tema e idioma antes da pintura (mesma lógica do `js/boot.js` da V6.0),
 * evitando o piscar de conteúdo no idioma/tema errados na primeira renderização.
 */
const bootScript = `(function(){try{var d=document.documentElement;var p=new URLSearchParams(location.search);var t=p.get('theme');if(t!=='kraft'&&t!=='clara'){t=localStorage.getItem('haru-theme');}if(t!=='kraft'&&t!=='clara'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'kraft':'clara';}d.setAttribute('data-theme',t);localStorage.setItem('haru-theme',t);var l=p.get('lang');if(l!=='en'&&l!=='pt'){l=localStorage.getItem('haru-lang');}if(l!=='en'&&l!=='pt'){var a=navigator.languages&&navigator.languages.length?navigator.languages:[navigator.language||'pt'];l='pt';for(var i=0;i<a.length;i++){if(a[i]==='en'||String(a[i]).indexOf('en-')===0){l='en';break;}}}d.setAttribute('data-lang',l);d.lang=l==='en'?'en':'pt-BR';localStorage.setItem('haru-lang',l);}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  // `suppressHydrationWarning` é necessário porque o bootScript abaixo aplica
  // `data-theme`/`data-lang` no <html> antes da hidratação, então esses
  // atributos não batem com o HTML gerado pelo servidor.
  return (
    <html
      lang="pt-BR"
      className={`h-full antialiased bg-ivory`}
      suppressHydrationWarning
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <I18nProvider>
          <CartProvider>
            <SkipLink />
            <SmoothScroll>{children}</SmoothScroll>
          </CartProvider>
        </I18nProvider>
      </body>
    </html>
  );
}
