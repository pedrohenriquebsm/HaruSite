import Link from "next/link";
import HeaderNavButtons from "./headerNavButtons";
import { Menu, ShoppingBag, ShoppingBasket } from "lucide-react";

export default function Header() {
  return (
    <header
      className="sticky top-0 z-2  bg-ivory/85 backdrop-blur-md text-muted"
      id="header"
    >
      <nav className="navbar relative py-0 px-10 flex justify-between md:justify-around flex-wrap">
        <Link
          href={"/#top"}
          className="font-[Cormorant_Garamond_Variable] text-xl tracking-widest font-bold p-2"
        >
          HARU
        </Link>

        <ul className="text-xs tracking-widest gap-10 justify-end hidden md:flex items-center flex-nowrap text-nowrap">
          <li>
            <div className="drawer drawer-end">
              <input
                id="my-drawer-5"
                type="checkbox"
                className="drawer-toggle"
              />
              <div className="drawer-content">
                <label
                  htmlFor="my-drawer-5"
                  className="drawer-button btn btn-ghost"
                >
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
                    <p className="text-3xl font-semibold font-[Cormorant_Garamond_Variable]">Cesta</p>
                  </li>
                  <li>
                    <a>Sidebar Item 2</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
          <HeaderNavButtons />
        </ul>
        <span className="md:hidden">
          <details className="dropdown static">
            <summary className="btn btn-ghost active:bg-transparent focus:bg-transparent focus:border-0 hover:bg-transparent hover:border-0">
              <Menu />
            </summary>
            <ul className="menu dropdown-content absolute inset-x-0 w-full top-full gap-2 z-1 shadow-sm p-2 text-xs bg-ivory tracking-widest">
              <HeaderNavButtons />
            </ul>
          </details>
        </span>
      </nav>
    </header>
  );
}
