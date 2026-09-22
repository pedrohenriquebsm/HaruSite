import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default function ProductPage() {
  return (
    <main>
      <section className="max-w-6xl mx-auto grid grid-cols-1 gap-2 md:grid-cols-2">
        <div></div>
        <div className="flex flex-col gap-3 px-5 text-olive-deep">
          <span className="flex place-items-center gap-1">
            <ChevronLeft strokeWidth={1} size={18} />
            <Link href={"/#store"} className="uppercase font-light text-xs">
              Voltar à coleção
            </Link>
          </span>
          <h1 className="font-medium font-[Cormorant_Garamond_Variable] text-3xl">
            Escova de Bambu
          </h1>
          <p>R$ 48.99</p>
          <p className="font-light">
            Cabo de bambu selecionado, sem verniz plástico. Cerdas de crina de
            cavalo, esterilizadas a vapor, de animais selecionados e tratados
            com o devido cuidado.
          </p>
          <button className="btn bg-transparent btn-outline font-light uppercase tracking-widest text-sm">
            Adicionar à Cesta
          </button>
          <button className="btn bg-olive-deep text-white font-light uppercase tracking-widest text-sm">
            Finalizar a compra
          </button>
          
          <dl className="grid">
            <div className="flex flex-col">
              <dt className="font-extralight">Matéria</dt>
              <dd className="font-light">Duas unidades, bambu selecionado</dd>
            </div>
            <div className="flex flex-col">
              <dt className="font-extralight">Cerdas</dt>
              <dd className="font-light">Crina de cavalo, esterilizada a vapor</dd>
            </div>
            <div className="flex flex-col">
              <dt className="font-extralight">Uso</dt>
              <dd className="font-light">Secar em pé, cada uma no ar. Não deixar de molho.</dd>
            </div>
          </dl>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-light">FRETE</p>
            <span className="flex gap-2">
              <input
                type="text"
                name=""
                id=""
                className="input focus:outline-0"
                placeholder="00000-000"
              />
              <button className="btn bg-olive-deep text-white font-light uppercase tracking-widest text-sm">
                Calcular
              </button>
            </span>
          </div>
        </div>
      </section>
      <section>
        <h2></h2>
        <div>
          <p></p>
        </div>
        <h2></h2>
        <div>
          <p></p>
        </div>
      </section>
    </main>
  );
}
