import type { Metadata } from "next";
import EssayContent from "@/app/_components/legal/essayContent/essayContent";

export const metadata: Metadata = {
  title: "HARU — O que a escova de nylon deixa no corpo",
  description:
    "Microplásticos na escovação, no sangue e na Terra. Por que a HARU usa crina, e não nylon.",
};

export default function Microplastic() {
  return <EssayContent />;
}
