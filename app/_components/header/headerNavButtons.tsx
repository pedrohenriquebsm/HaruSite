import Link from "next/link";

export default function HeaderNavButtons() {
  return (
    <>
      <li>
        <Link href={'/products'} className="p-2">SHOP</Link>
      </li>
      <li>
        <Link href={'/about'} className="p-2">THE BRAND</Link>
      </li>
      <li>
        <Link href={'/microplastic'} className="p-2">MATTER</Link>
      </li>
      <li>
        <Link href={'/use-notes'} className="p-2">USE</Link>
      </li>
      <li>
        <Link href={'/contact'} className="p-2">CONTACT</Link>
      </li>
    </>
  )
}