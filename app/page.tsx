import Image from "next/image";
import Header from "./_components/header/header";
import Product from "./_components/product/product";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <section className="relative w-screen h-screen">
          <a href="#header" className="absolute w-screen h-screen z-2"/>
          <div className="flex flex-col justify-center items-center h-screen relative z-1">
            <Image
              src="/logos/logo-light.png"
              alt="Logo da Haru, sendo um desenho minimalista de uma silhueta de um cavalo"
              width={587}
              height={695}
              loading="eager"
              className="w-auto h-48 drop-shadow-lg"
            />
            <h1 className="font-[Cormorant_Garamond_Variable] text-[#f6f1e8] text-center text-6xl tracking-[0.25em] font-medium sm:text-9xl drop-shadow-lg">
              HARU
            </h1>
          </div>
          <p className="absolute bottom-16 w-screen z-1 flex flex-col items-center gap-1 text-white/90 drop-shadow-lg">
            <span className="text-xs uppercase tracking-[0.3em]">
              Rolar para baixo
            </span>
            <ArrowDown className="h-5 w-5 animate-bounce"/>
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
        <Header/>
        <section className="md:mt-10 p-10">
          <span className="flex flex-col gap-10 py-15">
            <p className="tracking-widest text-sm font-light">COLEÇÃO</p>
            <p className="font-[Cormorant_Garamond_Variable] text-5xl font-medium">O essencial.</p>
          </span>
          <span className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-10">
            <Product description="Cabo de bambu selecionado, sem verniz plástico. esterilizadas a vapor." name="Escova de bambu" price={48.99} id="10"/>
            <Product description="Cabo de bambu selecionado, sem verniz plástico. esterilizadas a vapor." name="Escova de bambu" price={48.99} id="10"/>
            <Product description="Cabo de bambu selecionado, sem verniz plástico. esterilizadas a vapor." name="Escova de bambu" price={48.99} id="10"/>
            <Product description="Cabo de bambu selecionado, sem verniz plástico. esterilizadas a vapor." name="Escova de bambu" price={48.99} id="10"/>
            <Product description="Cabo de bambu selecionado, sem verniz plástico. esterilizadas a vapor." name="Escova de bambu" price={48.99} id="10"/>
          </span>
        </section>
        <section>
          <h3>A MARCA</h3>
          <h2>HARU é matéria <br/>natural</h2>
          <p>Materiais que voltam para a terra. Escovas de bambu com cerdas de crina de cavalo — feitas para o hábito, não para o descarte.</p>
        </section>
        <section>
          <p>Por que HARU</p>
          <p>Natural de verdade.</p>
          <div className="grid grid-cols-4 gap-10">
            <div className="flex flex-col gap-10">
              <p>01</p>
              <p>100% natural</p>
              <p>Cabo de bambu e cerdas de crina de cavalo. Sem nylon, sem bioplástico disfarçado.</p>
            </div>
          </div>
        </section>
        <section>
          <p>O hábito</p>
          <p>Entenda como os microplásticos fazem mal à saúde.</p>
          <p>Escovas de plástico contaminam o seu corpo. Contaminam a terra. Um objeto íntimo não deveria deixar rastro por séculos.</p>
          <Link href={'/microplastic'}>Saber Mais</Link>
        </section>
        <section>
          <p>Cartas</p>
          <p>Pesquisas e o essencial, no e&#x2010;mail.</p>
          <p>Estudos sobre microplásticos e avisos da coleção.</p>

        </section>
        <section>
          <p>Fale com a HARU</p>
          <p>A loja ainda está nascendo. Se quiser a coleção, uma parceria ou só conversar sobre o hábito — escreva.</p>
          <div>
            <span></span>
          </div>
        </section>
      </main>
    </>
  );
}
