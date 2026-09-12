import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Haru",
  description: "Buy some biodegradable products!",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`h-full antialiased bg-[#f6f1e8]`}
    >
      <body>{children}</body>
    </html>
  );
}
