import { Link } from "react-router-dom";

interface BestSallersProductProps {
  id: string;
  name: string;
  img: string;
  price: number;
  discount: number;
}

function BestSallersProduct({ name, img, price, id, discount }: BestSallersProductProps) {
  return (
    <Link to={`/product/${id}`}>
      <div className="border shadow-lg px-2 lg:px-4 py-6 flex relative flex-col items-center text-center rounded-lg transition-shadow duration-300 hover:shadow-lg">
        {discount && (
          <span className="bg-green-100 text-green-800 absolute top-1 left-0 text-xs font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
            {discount} %
          </span>
        )}
        <div className="w-full h-28 mb-2 rounded-md overflow-hidden">
          <img src={`/public/images/${img}`} alt={name} className="w-full h-full object-contain" />
        </div>
        <div className="w-full border-t border-gray-100 pt-4 mt-4">
          <div className="h-12">
            <p className="text-base xl:text-lg font-semibold line-clamp-2">{name}</p>
          </div>
          <div className="flex flex-col justify-between items-center mt-4 flex-nowrap">
            <p className="text-primary-500 whitespace-nowrap">{price} تومان </p>
            <button className="bg-primary-500 mt-2  px-4 py-2 text-[10px] rounded-md shadow-md text-white hover:bg-primary-600 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg whitespace-nowrap">
              افزودن به سبد خرید
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BestSallersProduct;
