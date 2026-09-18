import Image from "next/image";
import Header from "./_components/header/header";
import Product from "./_components/product/product";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="relative">
          <div className="flex flex-col justify-center items-center h-screen relative z-1">
            <Image
              src="/logos/logo-light.png"
              alt="Logo da Haru, sendo um desenho minimalista de uma silhueta de um cavalo"
              width={587}
              height={695}
              loading="eager"
              className="w-38 h-auto"
            />
            <h1 className="font-[Cormorant_Garamond] text-white text-center text-8xl tracking-[10] font-medium">
              HARU
            </h1>
          </div>
          <Image
            src="/background/stale-grut-NUgw97CVdAk-unsplash.jpg"
            alt="Imagem de uma plantação de bambu"
            width={1920}
            height={1280}
            loading="eager"
            className="w-screen h-auto absolute inset-0 object-cover"
          />
        </div>
        <div>
          <span>
            <p>Coleção</p>
            <p>O essencial.</p>
          </span>
          <span>
            <p>Coleção</p>
            <Product description="Cabo de bambu selecionado, sem verniz plástico. esterilizadas a vapor." name="Escova de bambu" price={48.99} id="10"/>
          </span>
        </div>
      </main>
    </>
  );
}
