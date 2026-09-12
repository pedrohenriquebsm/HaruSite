import Link from "next/link";
import HeaderNavButtons from "./headerNavButtons";

export default function Header() {
  return (
    <header>
      <nav className="navbar p-5 px-10 flex justify-between md:justify-around flex-wrap">
        <Link href={'/'} className="font-[Cormorant_Garamond] text-xl tracking-widest font-bold p-2">HARU</Link>

        <ul className="text-xs tracking-widest gap-10 justify-end hidden md:flex flex-nowrap text-nowrap">
          <HeaderNavButtons />
        </ul>
        <span className="md:hidden navbar-end">
          <details className="dropdown">
            <summary className="btn btn-ghost">hamburguer</summary>
            <ul className="text-xs tracking-widest menu dropdown-content fixed left-0 w-screen gap-2 rounded-none z-1 shadow-sm p-2">
              <HeaderNavButtons />
            </ul>
          </details>
        </span>
      </nav>
    </header>
  );
}