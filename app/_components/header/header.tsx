import Link from "next/link";
import HeaderNavButtons from "./headerNavButtons";
import { Menu } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-1  bg-[#f6f1e8da] backdrop-blur-md" id="header">
      <nav className="navbar relative py-0 px-10 flex justify-between md:justify-around flex-wrap">
        <Link
          href={"/"}
          className="font-[Cormorant_Garamond_Variable] text-xl tracking-widest font-bold p-2"
        >
          HARU
        </Link>

        <ul className="text-xs tracking-widest gap-10 justify-end hidden md:flex flex-nowrap text-nowrap">
          <HeaderNavButtons />
        </ul>
        <span className="md:hidden">
          <details className="dropdown static">
            <summary className="btn btn-ghost active:bg-transparent focus:bg-transparent focus:border-0 hover:bg-transparent hover:border-0">
              <Menu />
            </summary>
            <ul className="menu dropdown-content absolute inset-x-0 w-full top-full gap-2 z-1 shadow-sm p-2 text-xs bg-[#f6f1e8] tracking-widest">
              <HeaderNavButtons />
            </ul>
          </details>
        </span>
      </nav>
    </header>
  );
}
