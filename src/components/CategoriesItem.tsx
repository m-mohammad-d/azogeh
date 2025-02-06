import { Link } from "react-router-dom";
import { cn } from "../utils/util";

interface CategoriesItemProps {
  id: string;
  name: string;
  img: string;
  className?: string;
}

function CategoriesItem({ name, img, className }: CategoriesItemProps) {
  return (
    <Link to={`/products?category=${name}`}>
      <div className={cn("flex h-full w-full max-w-48 flex-col items-center rounded-md border border-neutral-gray-2 bg-white text-center text-neutral-gray-8 shadow-md", className)}>
        <div className="h-32 w-full bg-white">
          <img src={`/category/${img}.webp`} alt={name} className="h-full w-full object-contain py-2" />
        </div>
        <div className="px-4 py-2">
          <p className="text-secondary-100 line-clamp-2 h-12 text-sm font-semibold md:text-base lg:text-xl">{name}</p>
        </div>
      </div>
    </Link>
  );
}

export default CategoriesItem;
