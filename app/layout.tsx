import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haru — Higiene feita de matéria, não de plástico",
  description: "HARU. Higiene feita de matéria, não de plástico — bambu e crina de cavalo.",
  icons: [
    { rel: "icon", url: "/logos/favicon.png", type: "image/png" },
    { rel: "apple-touch-icon", url: "/logos/favicon.png" },
  ]
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`h-full antialiased bg-ivory`}
    >
      <body>{children}</body>
    </html>
  );
}
