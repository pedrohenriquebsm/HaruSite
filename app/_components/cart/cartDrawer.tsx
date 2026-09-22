"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "./cartContext";

export default function CartDrawer() {
  const { items, count, total, decrease, increase, remove } = useCart();

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-5" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor="my-drawer-5" className="drawer-button btn btn-ghost">
          <ShoppingBag width={15} />
        </label>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-5"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="menu bg-base-200 min-h-full w-80 p-4">
          <li>
            <p className="text-3xl font-semibold font-[Cormorant_Garamond_Variable]">
              Cesta
            </p>
          </li>
          <li>
            <a>Sua cesta está vazia</a>
          </li>
        </ul>
      </div>
    </div>
  );
  {
    /*<div className="drawer drawer-end">
      <input id="cart-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label
          htmlFor="cart-drawer"
          className="drawer-button btn btn-ghost"
          aria-label="Abrir a cesta"
        >
          <span className="relative">
            <ShoppingBag width={15} />
            {count > 0 && (
              <span className="badge badge-sm badge-outline absolute -right-2 -top-2 bg-ivory text-olive-deep">
                {count}
              </span>
            )}
          </span>
        </label>
      </div>
      <div className="drawer-side z-40">
        <label
          htmlFor="cart-drawer"
          aria-label="Fechar a cesta"
          className="drawer-overlay"
        ></label>
        <div className="bg-ivory text-text flex min-h-full w-80 flex-col gap-5 p-6">
          <div className="flex items-center justify-between">
            <p className="font-[Cormorant_Garamond_Variable] text-3xl font-semibold">
              Cesta
            </p>
            <label
              htmlFor="cart-drawer"
              className="btn btn-ghost btn-sm"
              aria-label="Fechar a cesta"
            >
              <X size={16} />
            </label>
          </div>

          {items.length === 0 ? (
            <p className="font-light text-sm">
              Sua cesta está vazia. Ainda bem — o hábito só começa quando você
              escolhe.
            </p>
          ) : (
            <ul className="flex flex-col gap-4">
              {items.map((line) => (
                <li
                  key={line.slug}
                  className="flex items-center gap-3 border-b pb-3"
                >
                  <Image
                    src={line.image}
                    alt={line.name}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-sm">{line.name}</p>
                    <span className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => decrease(line.slug)}
                        aria-label={`Diminuir quantidade de ${line.name}`}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm">{line.qty}</span>
                      <button
                        type="button"
                        onClick={() => increase(line.slug)}
                        aria-label={`Aumentar quantidade de ${line.name}`}
                      >
                        <Plus size={14} />
                      </button>
                      <span className="ml-auto text-sm">
                        R$ {line.price * line.qty}
                      </span>
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(line.slug)}
                    aria-label={`Remover ${line.name} da cesta`}
                  >
                    <X size={14} />
                  </button>
                </li>
              ))}
            </ul>
          )}

          {items.length > 0 && (
            <>
              <div className="flex justify-between text-sm">
                <span className="font-light">Total</span>
                <span>R$ {total}</span>
              </div>
              <button className="btn bg-olive-deep font-light tracking-widest text-white uppercase text-sm">
                Finalizar a compra
              </button>
              <p className="text-xs font-light text-muted">
                O pagamento ainda não está ligado. Estes itens ficam salvos
                neste aparelho até o nosso checkout entrar no ar.
              </p>
            </>
          )}
        </div>
      </div>
    </div>*/
  }
}
