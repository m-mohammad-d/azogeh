import { Link } from "react-router-dom";
import { Product } from "../types/product";
import { separateThousands } from "../utils/FormatNumber";

import Button from "./Button";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { _id, name, image, price, discount, discountedPrice } = product;

  return (
    <Link
      to={`/product/${_id}`}
      className="relative block h-96 w-full max-w-[18rem] transform cursor-pointer overflow-hidden rounded-md bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <article className="flex h-full flex-col p-4">
        {discount > 0 && <div className="absolute left-2 top-2 z-10 flex size-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white">{discount}%</div>}

        <div className="mb-4 flex h-40 w-full items-center justify-center overflow-hidden rounded-lg">
          <img src={image} alt={name} className="h-full w-full object-contain" />
        </div>

        <h3 className="mb-2 line-clamp-2 max-h-12 md:max-h-16 text-center text-sm font-medium text-gray-800 md:text-lg">{name}</h3>

        <div className="mb-4 mt-auto flex items-center justify-center gap-2 space-x-2">
          <p className={`text-sm font-semibold md:text-lg ${discount > 0 ? "text-sm text-neutral-gray-7 line-through" : "text-gray-800"}`}>{separateThousands(price)} تومان</p>

          {discount > 0 && discountedPrice !== null && <p className="text-primary-500 text-lg">{separateThousands(discountedPrice)} تومان</p>}
        </div>

        <div className="mt-2 flex justify-center">
          <Button size="small" shape={8} className="text-xs sm:text-sm md:text-base">
            افزودن به سبد خرید
          </Button>
        </div>
      </article>
    </Link>
  );
}

export default ProductCard;
