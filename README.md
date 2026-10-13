# HARU

Higiene feita de matéria, não de plástico — bambu e crina de cavalo.

O site é um único aplicativo **Next.js** (App Router), com **daisyUI**,
**Tailwind CSS 4**, **Lenis** (rolagem suave) e **GSAP** (transição do herói).
Ele reúne o conteúdo e o comportamento da versão estática V6.0: coleção,
cesta que persiste entre páginas, seletor de tema (claro/kraft), seletor de
idioma (pt/en), a seção **Cartas**, os canais de contato e o cálculo de frete
por CEP.

## Requisitos

- Node.js 20.9 ou superior (o projeto usa Next.js 16).

## Desenvolvimento

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Build de produção

```bash
npm run build
```

O site é exportado como estático (`output: "export"`) para a pasta `out/`,
pronto para o GitHub Pages. Quando o site for servido de um sub-caminho
(`https://<usuário>.github.io/<repositório>/`), o build recebe
`NEXT_PUBLIC_BASE_PATH=/<repositório>` — o fluxo em
`.github/workflows/nextjs.yml` cuida disso.

## Estrutura

- `app/` — rotas e componentes (App Router).
  - `app/page.tsx` — página principal.
  - `app/(site)/` — páginas internas: coleção, ensaio (matéria), notas de uso,
    privacidade e termos.
  - `app/_components/` — herói, cabeçalho, rodapé, cesta, produto, frete,
    idioma, tema, cartas e contato.
  - `app/_lib/i18n.tsx` — provedor de idioma (`pt`/`en`).
  - `app/_data/translations.json` — todos os textos, nos dois idiomas.
  - `app/_data/products.ts` — catálogo (preço, galeria, peso).
- `public/` — imagens e logotipos.

## Idiomas

O idioma segue, nesta ordem: `?lang=`, o que estiver salvo em
`haru-lang` e o idioma do navegador. O padrão é português. O tema segue a
mesma lógica com `haru-theme` e `prefers-color-scheme`.
