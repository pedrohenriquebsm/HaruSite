import { Metadata } from "next";
import UseNotesContent from "@/app/_components/legal/useNotesContent/useNotesContent";

export const metadata: Metadata = {
  title: "HARU — Notas de uso",
  description:
    "Notas de uso da escova HARU: de que é feita, como secar, quando trocar e como descartar.",
};

export default function UseNotes() {
  return <UseNotesContent />;
}
