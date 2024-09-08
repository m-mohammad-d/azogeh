interface BestSallersProductProps {
  name: string;
  img: string;
  price: number;
}

function BestSallersProduct({ name, img, price }: BestSallersProductProps) {
  return (
    <div className="border bg-[#FDFAFB] shadow-md px-4 py-6 flex flex-col items-center text-center rounded-lg transition-shadow duration-300 hover:shadow-lg">
      <div className="w-full h-28 mb-2 rounded-md overflow-hidden">
        <img src={`/public/images/${img}`} alt={name} className="w-full h-full object-contain" />
      </div>
      <div className="w-full border-t border-gray-100 pt-4 mt-4">
        <div className="h-12">
          <p className="text-lg font-semibold line-clamp-2">{name}</p>
        </div>
        <div className="flex justify-between items-center mt-4 flex-nowrap">
          <p className="text-primary-500 whitespace-nowrap">{price}تومان </p>
          <button className="bg-primary-500 px-4 py-2 text-[10px] rounded-md shadow-md text-white hover:bg-primary-600 transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg whitespace-nowrap">
            افزودن به سبد خرید
          </button>
        </div>
      </div>
    </div>
  );
}

export default BestSallersProduct;
