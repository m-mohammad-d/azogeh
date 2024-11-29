import { Link } from "react-router-dom";
import { Product } from "../types/product";
import { separateThousands } from "../utils/FormatNumber";
import { FaTag } from "react-icons/fa";

interface BestSallersProductProps {
  product: Product;
}

function BestSallersProduct({ product }: BestSallersProductProps) {
  const { _id, name, image, price, discount, discountedPrice } = product;

  return (
    <Link
      to={`/product/${_id}`}
      className="block cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 relative"
    >
      <article className="p-4 flex flex-col h-full">
        {discount > 0 && (
          <div className="bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full absolute top-3 left-3 z-10">
            {discount}%
          </div>
        )}
        <div className="flex justify-center items-center mb-4 h-40 w-40 overflow-hidden rounded-lg">
          <img src={`${image}`} alt={name} className="object-contain" />
        </div>
        <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 text-center">{name}</h3>

        <div className="flex flex-col mt-auto space-y-1">
          <p
            className={`text-lg font-semibold flex items-center justify-center ${
              discount > 0 ? "line-through text-gray-400" : "text-gray-800"
            }`}
          >
            <FaTag className="mr-1" />
            {separateThousands(price)} تومان
          </p>
          {discount > 0 && discountedPrice !== null && (
            <p className="text-lg font-bold text-primary-500 flex items-center justify-center">
              <FaTag className="mr-1 text-red-500" />
              {separateThousands(discountedPrice)} تومان
            </p>
          )}
        </div>
      </article>
    </Link>
  );
}

export default BestSallersProduct;
