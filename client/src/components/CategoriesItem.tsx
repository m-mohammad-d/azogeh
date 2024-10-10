import { Link } from "react-router-dom";

interface CategoriesItemProps {
  id: string
  name: string;
  img: string;
}

function CategoriesItem({id ,  name, img }: CategoriesItemProps) {
  return (
    <Link to={`/products?category=${id}`}>
      <div className="border bg-[#FDFAFB] shadow-md px-4 py-6 flex flex-col items-center text-center">
        <div className="w-auto h-28 mb-2">
          <img src={`/public/category/${img}.png`} alt={name} className="w-full h-full object-contain" />
        </div>
        <div>
          <p className="text-base lg:text-xl font-semibold text-gray-700 mt-4">{name}</p>
        </div>
      </div>
    </Link>
  );
}

export default CategoriesItem;
