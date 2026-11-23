"use client";

import { useEffect, useState, useId } from "react";
import Image from "next/image";
import {
  Minus,
  Plus,
  X,
  ArrowLeft,
  CheckCircle,
  CreditCard,
  QrCode,
  FileText,
} from "lucide-react";
import { useCart, type CheckoutData } from "./cartContext";
import { useI18n, money } from "@/app/_lib/i18n";
import { getProduct } from "@/app/_data/products";

const UF_ZONE: Record<string, string> = {
  SP: "se",
  RJ: "se",
  ES: "se",
  MG: "se",
  PR: "s",
  SC: "s",
  RS: "s",
  DF: "co",
  GO: "co",
  MT: "co",
  MS: "co",
  BA: "ne",
  SE: "ne",
  AL: "ne",
  PE: "ne",
  PB: "ne",
  RN: "ne",
  CE: "ne",
  PI: "ne",
  MA: "ne",
  AM: "n",
  PA: "n",
  AC: "n",
  RO: "n",
  RR: "n",
  AP: "n",
  TO: "n",
};

const ZONE_RATE: Record<
  string,
  { pac: number; sedex: number; pacDays: [number, number]; sedexDays: [number, number] }
> = {
  se: { pac: 14.9, sedex: 24.9, pacDays: [4, 7], sedexDays: [1, 3] },
  s: { pac: 18.9, sedex: 29.9, pacDays: [5, 8], sedexDays: [2, 4] },
  co: { pac: 22.9, sedex: 34.9, pacDays: [6, 10], sedexDays: [3, 5] },
  ne: { pac: 27.9, sedex: 42.9, pacDays: [7, 12], sedexDays: [4, 6] },
  n: { pac: 32.9, sedex: 49.9, pacDays: [8, 14], sedexDays: [5, 8] },
};

function BasketIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="w-5 h-5 fill-none stroke-current"
    >
      <g className="fill-current stroke-none">
        <circle cx="9.7" cy="5.05" r="0.55" />
        <circle cx="12.15" cy="4.15" r="0.46" />
        <circle cx="14.35" cy="5.35" r="0.4" />
      </g>
      <path
        d="M8.85 8.2V6.2A3.15 3.15 0 0 1 12 3.1 3.15 3.15 0 0 1 15.15 6.2V8.2"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <ellipse cx="12" cy="8.35" rx="7.35" ry="1.9" strokeWidth="1.2" />
      <path
        d="M4.9 8.55c.55 3.55 1.15 9.35 7.1 9.35s6.55-5.8 7.1-9.35"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M6.7 11.85c.5 2.7 1.7 4.85 5.3 4.85s4.8-2.15 5.3-4.85"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <path
        d="M8.15 14.95c.4 1.25 1.3 2.05 3.85 2.05s3.45-.8 3.85-2.05"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function CartDrawer({ id: customId }: { id?: string }) {
  const generatedId = useId();
  const drawerId = customId || `cart-drawer-${generatedId.replace(/:/g, "")}`;
  const {
    items,
    count,
    total,
    isOpen,
    setIsOpen,
    view,
    setView,
    step,
    setStep,
    checkData,
    updateCheckData,
    decrease,
    increase,
    remove,
  } = useCart();
  const { t } = useI18n();

  const [cepLoading, setCepLoading] = useState(false);
  const [cepError, setCepError] = useState("");

  const label = (slug: string) => {
    const product = getProduct(slug);
    return product ? t(`${product.prefix}.name`) : slug;
  };

  // Cálculo de peso total para frete
  const totalWeight = items.reduce((sum, item) => {
    const p = getProduct(item.slug);
    return sum + (p?.weight || 1) * item.qty;
  }, 0);

  const factor =
    totalWeight <= 1
      ? 1
      : totalWeight <= 2
        ? 1.15
        : totalWeight <= 4
          ? 1.28
          : 1.4;

  const rates = checkData.uf
    ? (() => {
        const zone = UF_ZONE[checkData.uf] || "se";
        const base = ZONE_RATE[zone];
        return {
          pac: base.pac * factor,
          pacDays: base.pacDays,
          sedex: base.sedex * factor,
          sedexDays: base.sedexDays,
        };
      })()
    : null;

  useEffect(() => {
    if (rates) {
      const price = checkData.service === "sedex" ? rates.sedex : rates.pac;
      if (checkData.shippingPrice !== price) {
        updateCheckData({ shippingPrice: price });
      }
    }
  }, [rates, checkData.service, checkData.shippingPrice, updateCheckData]);

  // Busca automática do CEP
  const handleCepChange = async (rawVal: string) => {
    const digits = rawVal.replace(/\D/g, "").slice(0, 8);
    const masked = digits.replace(/^(\d{5})(\d)/, "$1-$2");
    updateCheckData({ cep: masked });
    setCepError("");

    if (digits.length === 8) {
      setCepLoading(true);
      try {
        const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
        const data = await res.json();
        if (data.erro) {
          setCepError(t("cep.err"));
        } else {
          updateCheckData({
            street: data.logradouro || "",
            district: data.bairro || "",
            city: data.localidade || "",
            uf: data.uf || "SP",
          });
        }
      } catch {
        setCepError(t("cep.err"));
      } finally {
        setCepLoading(false);
      }
    }
  };

  const handlePayOrder = () => {
    const orderId = `haru-${Date.now()}`;
    const order = {
      id: orderId,
      date: new Date().toISOString(),
      email: checkData.email,
      items,
      address: {
        cep: checkData.cep,
        street: checkData.street,
        number: checkData.number,
        complement: checkData.complement,
        district: checkData.district,
        city: checkData.city,
        uf: checkData.uf,
      },
      shipping: {
        service: checkData.service,
        price: checkData.shippingPrice,
      },
      total: total + checkData.shippingPrice,
      method: checkData.method,
    };
    try {
      window.localStorage.setItem("haru-last-order", JSON.stringify(order));
    } catch {
      /* ignore */
    }
    setStep("done");
  };

  return (
    <div className="drawer drawer-end">
      <input
        id={drawerId}
        type="checkbox"
        className="drawer-toggle"
        checked={isOpen}
        onChange={(e) => setIsOpen(e.target.checked)}
      />
      <div className="drawer-content">
        <button
          type="button"
          onClick={() => {
            setView("cart");
            setIsOpen(true);
          }}
          className="btn btn-ghost hover:bg-transparent border-0 relative p-2"
          aria-label={
            count > 0 ? `${t("cart.open")} (${count})` : t("cart.open")
          }
        >
          <BasketIcon />
          {count > 0 && (
            <span className="badge badge-xs bg-olive-deep text-white border-0 absolute -right-1 -top-1 px-1.5 py-0.5 text-[10px]">
              {count}
            </span>
          )}
        </button>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor={drawerId}
          aria-label={t("cart.close")}
          className="drawer-overlay"
          onClick={() => setIsOpen(false)}
        />
        <div
          className="bg-ivory text-text flex min-h-full w-full max-w-md flex-col justify-between p-6 shadow-2xl transition-all"
          data-lenis-prevent
        >
          <div>
            {/* Header da Gaveta */}
            <div className="flex items-center justify-between border-b pb-4 mb-5">
              <div className="flex items-center gap-2">
                {view === "check" && step !== "done" && (
                  <button
                    type="button"
                    onClick={() => {
                      if (step === "code") setStep("email");
                      else if (step === "address") setStep("code");
                      else if (step === "pay") setStep("address");
                      else setView("cart");
                    }}
                    className="btn btn-ghost btn-sm p-1"
                    aria-label={t("check.back")}
                  >
                    <ArrowLeft size={18} />
                  </button>
                )}
                <h2 className="font-[Cormorant_Garamond_Variable] text-2xl font-semibold">
                  {view === "cart"
                    ? t("cart.title")
                    : step === "done"
                      ? t("check.saved")
                      : t("check.address")}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="btn btn-ghost btn-sm p-1"
                aria-label={t("cart.close")}
              >
                <X size={18} />
              </button>
            </div>

            {/* Conteúdo da Cesta */}
            {view === "cart" && (
              <>
                {items.length === 0 ? (
                  <div className="py-20 text-center flex flex-col items-center gap-4 text-muted">
                    <BasketIcon />
                    <p className="font-light text-sm">{t("cart.empty")}</p>
                  </div>
                ) : (
                  <ul className="flex flex-col gap-4 divide-y divide-black/5">
                    {items.map((line) => (
                      <li
                        key={line.slug}
                        className="flex items-center gap-4 pt-4 first:pt-0"
                      >
                        <Image
                          src={line.image}
                          alt={label(line.slug)}
                          width={64}
                          height={64}
                          className="h-16 w-16 rounded object-cover border"
                        />
                        <div className="flex flex-1 flex-col gap-1">
                          <p className="text-sm font-medium">{label(line.slug)}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="join border rounded">
                              <button
                                type="button"
                                onClick={() => decrease(line.slug)}
                                className="join-item btn btn-xs btn-ghost px-2"
                                aria-label={`− ${label(line.slug)}`}
                              >
                                <Minus size={12} />
                              </button>
                              <span className="join-item px-3 flex items-center text-xs">
                                {line.qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => increase(line.slug)}
                                className="join-item btn btn-xs btn-ghost px-2"
                                aria-label={`+ ${label(line.slug)}`}
                              >
                                <Plus size={12} />
                              </button>
                            </span>
                            <span className="text-xs text-muted">
                              {money(line.price * line.qty)}
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => remove(line.slug)}
                          className="btn btn-ghost btn-xs text-muted hover:text-black"
                          aria-label={`${t("cart.remove")} — ${label(line.slug)}`}
                        >
                          <X size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}

            {/* Conteúdo do Checkout */}
            {view === "check" && (
              <div className="flex flex-col gap-5 text-sm">
                {step === "email" && (
                  <div className="flex flex-col gap-4">
                    <p className="font-light text-xs text-muted">
                      {t("check.lead")}
                    </p>
                    <div className="form-control">
                      <label className="label text-xs uppercase tracking-widest text-muted">
                        {t("check.email")}
                      </label>
                      <input
                        type="email"
                        value={checkData.email}
                        onChange={(e) =>
                          updateCheckData({ email: e.target.value })
                        }
                        placeholder={t("check.emailPh")}
                        className="input input-bordered bg-transparent text-sm w-full"
                        required
                      />
                    </div>
                    <button
                      type="button"
                      disabled={!checkData.email.includes("@")}
                      onClick={() => setStep("code")}
                      className="btn bg-olive-deep text-white font-light tracking-widest uppercase text-xs mt-2"
                    >
                      {t("check.sendCode")}
                    </button>
                  </div>
                )}

                {step === "code" && (
                  <div className="flex flex-col gap-4">
                    <p className="font-light text-xs text-muted">
                      {t("check.codeHint")}
                    </p>
                    <div className="form-control">
                      <label className="label text-xs uppercase tracking-widest text-muted">
                        {t("check.code")}
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={checkData.code}
                        onChange={(e) =>
                          updateCheckData({
                            code: e.target.value.replace(/\D/g, ""),
                          })
                        }
                        placeholder={t("check.codePh")}
                        className="input input-bordered bg-transparent tracking-widest text-center text-lg font-mono"
                      />
                    </div>
                    <button
                      type="button"
                      disabled={checkData.code.length < 6}
                      onClick={() => {
                        updateCheckData({ verified: true });
                        setStep("address");
                      }}
                      className="btn bg-olive-deep text-white font-light tracking-widest uppercase text-xs"
                    >
                      {t("check.verify")}
                    </button>
                  </div>
                )}

                {step === "address" && (
                  <div className="flex flex-col gap-3">
                    <div className="form-control">
                      <label className="label text-xs uppercase tracking-widest text-muted">
                        {t("check.cep")}
                      </label>
                      <input
                        type="text"
                        value={checkData.cep}
                        onChange={(e) => handleCepChange(e.target.value)}
                        placeholder="00000-000"
                        className="input input-bordered bg-transparent text-sm"
                      />
                      {cepLoading && (
                        <span className="text-xs text-muted mt-1">
                          {t("cep.looking")}
                        </span>
                      )}
                      {cepError && (
                        <span className="text-xs text-error mt-1">
                          {cepError}
                        </span>
                      )}
                    </div>

                    {rates && (
                      <div className="border rounded p-3 bg-white/40 flex flex-col gap-2 my-2">
                        <p className="text-xs uppercase tracking-widest text-muted font-medium">
                          Opções de Envio ({checkData.city} — {checkData.uf})
                        </p>
                        <label className="flex items-center justify-between text-xs cursor-pointer">
                          <span className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="shipping"
                              className="radio radio-xs"
                              checked={checkData.service === "pac"}
                              onChange={() =>
                                updateCheckData({ service: "pac" })
                              }
                            />
                            <span>PAC ({rates.pacDays[0]} a {rates.pacDays[1]} dias)</span>
                          </span>
                          <span className="font-medium">{money(rates.pac)}</span>
                        </label>
                        <label className="flex items-center justify-between text-xs cursor-pointer">
                          <span className="flex items-center gap-2">
                            <input
                              type="radio"
                              name="shipping"
                              className="radio radio-xs"
                              checked={checkData.service === "sedex"}
                              onChange={() =>
                                updateCheckData({ service: "sedex" })
                              }
                            />
                            <span>SEDEX ({rates.sedexDays[0]} a {rates.sedexDays[1]} dias)</span>
                          </span>
                          <span className="font-medium">{money(rates.sedex)}</span>
                        </label>
                      </div>
                    )}

                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2 form-control">
                        <label className="label text-xs uppercase tracking-widest text-muted">
                          {t("check.street")}
                        </label>
                        <input
                          type="text"
                          value={checkData.street}
                          onChange={(e) =>
                            updateCheckData({ street: e.target.value })
                          }
                          className="input input-bordered bg-transparent text-sm"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label text-xs uppercase tracking-widest text-muted">
                          {t("check.number")}
                        </label>
                        <input
                          type="text"
                          value={checkData.number}
                          onChange={(e) =>
                            updateCheckData({ number: e.target.value })
                          }
                          className="input input-bordered bg-transparent text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="form-control">
                        <label className="label text-xs uppercase tracking-widest text-muted">
                          {t("check.comp")}
                        </label>
                        <input
                          type="text"
                          value={checkData.complement}
                          onChange={(e) =>
                            updateCheckData({ complement: e.target.value })
                          }
                          className="input input-bordered bg-transparent text-sm"
                        />
                      </div>
                      <div className="form-control">
                        <label className="label text-xs uppercase tracking-widest text-muted">
                          {t("check.district")}
                        </label>
                        <input
                          type="text"
                          value={checkData.district}
                          onChange={(e) =>
                            updateCheckData({ district: e.target.value })
                          }
                          className="input input-bordered bg-transparent text-sm"
                        />
                      </div>
                    </div>

                    <button
                      type="button"
                      disabled={!checkData.street || !checkData.number}
                      onClick={() => setStep("pay")}
                      className="btn bg-olive-deep text-white font-light tracking-widest uppercase text-xs mt-3"
                    >
                      {t("check.nextPay")}
                    </button>
                  </div>
                )}

                {step === "pay" && (
                  <div className="flex flex-col gap-4">
                    <div className="border rounded p-3 bg-white/50 flex flex-col gap-2">
                      <div className="flex justify-between text-xs text-muted">
                        <span>{t("cart.subtotal")}</span>
                        <span>{money(total)}</span>
                      </div>
                      <div className="flex justify-between text-xs text-muted">
                        <span>Frete ({checkData.service.toUpperCase()})</span>
                        <span>{money(checkData.shippingPrice)}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold border-t pt-2 mt-1">
                        <span>Total</span>
                        <span>{money(total + checkData.shippingPrice)}</span>
                      </div>
                    </div>

                    <p className="text-xs uppercase tracking-widest text-muted font-medium mt-1">
                      {t("check.method")}
                    </p>
                    <div className="flex flex-col gap-2">
                      {[
                        {
                          id: "pix",
                          name: t("product.pix"),
                          meta: t("product.pixMeta"),
                          icon: <QrCode size={16} />,
                        },
                        {
                          id: "apple",
                          name: t("product.applePay"),
                          meta: "Apple Pay",
                          icon: <CreditCard size={16} />,
                        },
                        {
                          id: "card",
                          name: t("product.cardPay"),
                          meta: t("product.cardMeta"),
                          icon: <CreditCard size={16} />,
                        },
                        {
                          id: "boleto",
                          name: t("product.boleto"),
                          meta: t("product.boletoMeta"),
                          icon: <FileText size={16} />,
                        },
                      ].map((m) => (
                        <label
                          key={m.id}
                          className={`flex items-center justify-between p-3 border rounded cursor-pointer transition-colors ${
                            checkData.method === m.id
                              ? "border-olive-deep bg-olive-deep/5"
                              : "hover:bg-black/5"
                          }`}
                        >
                          <span className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="pay-method"
                              className="radio radio-xs"
                              checked={checkData.method === m.id}
                              onChange={() =>
                                updateCheckData({
                                  method: m.id as CheckoutData["method"],
                                })
                              }
                            />
                            <span className="text-xs font-medium">
                              {m.name}
                            </span>
                          </span>
                          <span className="text-[11px] text-muted flex items-center gap-1">
                            {m.icon}
                            {m.meta}
                          </span>
                        </label>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handlePayOrder}
                      className="btn bg-olive-deep text-white font-light tracking-widest uppercase text-xs mt-3"
                    >
                      {t("check.pay")} — {money(total + checkData.shippingPrice)}
                    </button>
                  </div>
                )}

                {step === "done" && (
                  <div className="py-10 text-center flex flex-col items-center gap-4">
                    <CheckCircle size={44} className="text-olive" />
                    <p className="font-[Cormorant_Garamond_Variable] text-2xl font-medium">
                      {t("check.saved")}
                    </p>
                    <p className="font-light text-xs text-muted max-w-xs">
                      {t("check.stub")}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setView("cart");
                        setIsOpen(false);
                      }}
                      className="btn btn-outline border-olive-deep text-olive-deep font-light uppercase tracking-widest text-xs mt-4"
                    >
                      {t("cart.shop")}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer da Gaveta */}
          {view === "cart" && items.length > 0 && (
            <div className="border-t pt-4 flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="font-light">{t("cart.subtotal")}</span>
                <span className="font-semibold">{money(total)}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  setView("check");
                  if (checkData.verified && checkData.email) setStep("address");
                  else if (checkData.email) setStep("code");
                  else setStep("email");
                }}
                className="btn bg-olive-deep font-light tracking-widest text-white uppercase text-xs w-full py-3"
              >
                {t("cart.checkout")}
              </button>
              <p className="text-[11px] font-light text-muted text-center">
                {t("check.lead")}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
