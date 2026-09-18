import Image from "next/image";
import Header from "./_components/header/header";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="flex flex-col justify-center items-center min-h-screen">
          <Image
            src="/logos/logo-light.png"
            alt="Logo da Haru, sendo um desenho minimalista de uma silhueta de um cavalo"
            width={587}
            height={695}
            loading="eager"
            className="w-38 h-auto"
          />
          <h1 className="font-[Cormorant_Garamond] text-center text-8xl tracking-[10] font-medium">HARU</h1>
        </div>
        <div className="-z-1">
            <Image
              src="/background/stale-grut-NUgw97CVdAk-unsplash.jpg"
              alt="Imagem de uma plantação de bambu"
              width={1920}
              height={1280}
              loading="eager"
              className="w-screen h-auto"
            />
          </div>
      </main>
    </>
  );
}
