import { Link } from "react-router-dom";
import { cn } from "../utils/util";

interface CategoriesItemProps {
  id: string;
  name: string;
  img: string;
  className?: string;
}

function CategoriesItem({ id, name, img, className }: CategoriesItemProps) {
  return (
    <Link to={`/products?category=${id}`}>
      <div className={cn("flex flex-col items-center border px-4 py-6 text-center border-neutral-100 rounded-2xl shadow-xl" , className)}>
        <div className="mb-2 h-28 w-auto">
          <img src={`/category/${img}.webp`} alt={name} className="h-full w-full object-contain" />
        </div>
        <div>
          <p className="mt-4 text-base font-semibold text-secondary-100 lg:text-xl">{name}</p>
        </div>
      </div>
    </Link>
  );
}

export default CategoriesItem;
