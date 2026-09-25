import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "./_components/smoothScroll/smoothScroll";


export const metadata: Metadata = {
  title: "Haru — Higiene feita de matéria, não de plástico",
  description: "HARU. Higiene feita de matéria, não de plástico — bambu e crina de cavalo.",
  icons: [
    { rel: "icon", url: "/logos/favicon.png", type: "image/png" },
    { rel: "icon", url: "/icons/favicon-32.png", type: "image/png", sizes: "32x32" },
    { rel: "icon", url: "/icons/favicon-64.png", type: "image/png", sizes: "64x64" },
    { rel: "apple-touch-icon", url: "/icons/apple-touch.png" },
  ]
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`h-full antialiased bg-ivory`}
    >
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
