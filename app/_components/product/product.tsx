import Image from "next/image";
import Link from "next/link";

interface ProductProps {
  name: string;
  description: string;
  price: number;
  id: string;
}

export default function Product({
  name,
  description,
  price,
  id,
}: ProductProps) {
  return (
    <div className="card max-w-125 min-w-50">
      <figure>
        <img
          alt=""
          src="https://aeromorto.github.io/HaruSite/images/product-escova.jpg"
          className="w-full"
        />
      </figure>
      <div className="p-2 card-body">
        <h2 className="text-2xl card-title font-[Cormorant_Garamond_Variable] font-[350]">
          {name}
        </h2>
        <p className="text-sm mt-2 font-light">{description}</p>
        <div className="flex justify-between mt-4 card-actions">
          <p className="text-sm">R$ {price}</p>
          <Link
            href={id}
            className="underline underline-offset-4 tracking-widest font-thin text-sm text-lime-900"
          >
            VER PRODUTO
          </Link>
        </div>
      </div>
    </div>
  );
}
