import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-screen h-screen" id="top">
      <Link href="/#header" className="absolute w-screen h-screen z-2" />
      <div className="absolute inset-0 z-1 bg-forest/30" />
      <div className="flex flex-col justify-center items-center h-screen relative z-1">
        <Image
          src="/logos/logo-light.png"
          alt="Logo da Haru, sendo um desenho minimalista de uma silhueta de um cavalo"
          width={587}
          height={695}
          loading="eager"
          className="w-auto h-48 drop-shadow-lg"
        />
        <h1 className="font-[Cormorant_Garamond_Variable] text-ivory text-center text-6xl tracking-[0.25em] font-medium sm:text-9xl drop-shadow-lg">
          HARU
        </h1>
      </div>
      <p className="absolute bottom-16 w-screen z-1 flex flex-col items-center gap-1 text-white/90 drop-shadow-lg">
        <span className="text-xs uppercase tracking-[0.3em]">
          Rolar para baixo
        </span>
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </p>
      <Image
        src="/background/stale-grut-NUgw97CVdAk-unsplash.jpg"
        alt="Imagem de uma plantação de bambu"
        width={1920}
        height={1280}
        loading="eager"
        className="w-screen h-screen absolute inset-0 object-cover"
      />
    </section>
  );
}
