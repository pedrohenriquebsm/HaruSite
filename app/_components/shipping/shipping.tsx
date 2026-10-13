"use client";

import { useState, type FormEvent } from "react";
import { useI18n } from "@/app/_lib/i18n";

/** Zonas de frete do `js/main.js` da V6.0 — estimativa interna. */
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

const moneyBr = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const maskCep = (value: string) =>
  value
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/^(\d{5})(\d)/, "$1-$2");

interface Rate {
  key: string;
  price: number;
  min: number;
  max: number;
}

interface Result {
  error?: string;
  city?: string;
  uf?: string;
  rates?: Rate[];
}

export default function Shipping({ weight }: { weight: number }) {
  const { t } = useI18n();
  const [cep, setCep] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const factor = weight === 2 ? 1.15 : weight === 3 ? 1.4 : 1;

  const ratesForUf = (uf: string): Rate[] => {
    const zone = UF_ZONE[uf] || "se";
    const base = ZONE_RATE[zone];
    return [
      {
        key: "product.pac",
        price: base.pac * factor,
        min: base.pacDays[0],
        max: base.pacDays[1],
      },
      {
        key: "product.sedex",
        price: base.sedex * factor,
        min: base.sedexDays[0],
        max: base.sedexDays[1],
      },
    ];
  };

  async function lookup(cepDigits: string) {
    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepDigits}/json/`,
        { signal: AbortSignal.timeout(8000) },
      );
      if (!response.ok) throw new Error("network");
      const data = await response.json();
      if (!data || data.erro) throw new Error("miss");
      const uf = String(data.uf || "").toUpperCase();
      setResult({
        city: data.localidade || "",
        uf,
        rates: ratesForUf(uf),
      });
    } catch (error) {
      setResult({
        error:
          error instanceof Error && error.message === "miss"
            ? "product.cepMiss"
            : "product.cepNet",
      });
    }
  }

  function submit(event: FormEvent) {
    event.preventDefault();
    const digits = cep.replace(/\D/g, "");
    if (digits.length !== 8) {
      setResult({ error: "product.cepErr" });
      return;
    }
    setResult(null);
    void lookup(digits);
  }

  return (
    <section className="flex flex-col gap-2 border-t pt-4">
      <h2 className="text-sm font-light uppercase">{t("product.ship")}</h2>
      <form className="flex flex-col gap-2" onSubmit={submit} noValidate>
        <label htmlFor="cepInput" className="sr-only">
          {t("product.cep")}
        </label>
        <span className="flex gap-2">
          <input
            id="cepInput"
            name="cep"
            type="text"
            inputMode="numeric"
            autoComplete="postal-code"
            maxLength={9}
            value={cep}
            onChange={(event) => setCep(maskCep(event.target.value))}
            placeholder={t("product.cepPh")}
            className="input focus:outline-0"
          />
          <button
            type="submit"
            className="btn bg-olive-deep font-light text-sm uppercase tracking-widest text-white"
          >
            {t("product.cepGo")}
          </button>
        </span>
      </form>

      {result?.error && (
        <p className="text-sm font-light text-muted">{t(result.error)}</p>
      )}

      {result?.rates && (
        <>
          <p className="text-sm font-light">
            {t("product.cepWhere", { city: result.city ?? "", uf: result.uf ?? "" })}
          </p>
          <ul className="flex flex-col gap-1 text-sm">
            {result.rates.map((rate) => (
              <li key={rate.key} className="flex justify-between gap-4">
                <span>{t(rate.key)}</span>
                <span className="font-light text-muted">
                  {t("product.daysRange", { a: rate.min, b: rate.max })}
                </span>
                <span>{moneyBr(rate.price)}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs font-light text-muted">{t("product.shipNote")}</p>
        </>
      )}
    </section>
  );
}
