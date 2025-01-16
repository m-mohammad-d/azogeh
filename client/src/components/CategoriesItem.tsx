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
      <div className={cn("flex h-full w-full max-w-48 flex-col items-center rounded-md bg-primary-tint1 px-4 py-6 text-center shadow-md", className)}>
        <div className="mb-2 h-28 w-auto">
          <img src={`/category/${img}.webp`} alt={name} className="h-full w-full object-contain" />
        </div>
        <div>
          <p className="text-secondary-100 mt-4 text-sm font-semibold md:text-base lg:text-xl">{name}</p>
        </div>
      </div>
    </Link>
  );
}

export default CategoriesItem;
