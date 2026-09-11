import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="p-5 px-10 flex gap-10 justify-center">
        <Link href={'/'} className="font-[Cormorant_Garamond] w-2xl text-xl tracking-widest font-bold">HARU</Link>

        <Link href={'/use-notes'} className="text-xs tracking-widest">SHOP</Link>
        <Link href={'/use-notes'} className="text-xs tracking-widest">THE BRAND</Link>
        <Link href={'/use-notes'} className="text-xs tracking-widest">MATTER</Link>
        <Link href={'/use-notes'} className="text-xs tracking-widest">USE</Link>
        <Link href={'/contact'} className="text-xs tracking-widest">CONTACT</Link>
      </nav>
    </header>
  );
}