import { Metadata } from "next";
import LegalContent from "@/app/_components/legal/legalContent/legalContent";

export const metadata: Metadata = {
  title: "HARU — Termos de uso",
  description:
    "Termos de uso do site da HARU: a coleção, os pedidos, o frete estimado e o contato.",
};

export default function TermsOfUse() {
  return <LegalContent kind="terms" />;
}
