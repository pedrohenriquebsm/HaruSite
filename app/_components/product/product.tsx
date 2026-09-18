import Image from "next/image";
import Link from "next/link";

interface ProductProps{
  name: string,
  description: string
  price: number
  id: string
}

export default function Product ({name, description, price, id}: ProductProps) {
  return (
    <div className="w-125">
      <img alt="" src='https://aeromorto.github.io/HaruSite/images/product-escova.jpg' className="w-full"/>
      <div className="p-2">
        <h5 className="text-2xl tracking-wide font-[Cormorant_Garamond] font-bold">
          {name}
        </h5>
        <p className="text-sm mt-2 font-light">
          {description}
        </p>
        <div className="flex justify-between mt-4">
          <p className="text-sm">
            R$ {price}
          </p>
          <Link href={id} className="underline underline-offset-4 tracking-widest font-thin text-sm text-lime-900">VER PRODUTO</Link>
        </div>
      </div>
    </div>
  );
}