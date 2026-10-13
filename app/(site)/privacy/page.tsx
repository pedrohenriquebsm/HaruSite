import { Metadata } from "next";
import LegalContent from "@/app/_components/legal/legalContent/legalContent";

export const metadata: Metadata = {
  title: "HARU — Política de privacidade",
  description:
    "Como a HARU trata os seus dados: o que guardamos, por quê, e o que fica só neste aparelho.",
};

export default function Privacy() {
  return <LegalContent kind="privacy" />;
}
