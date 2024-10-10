import { Link } from "react-router-dom";
import { Product } from "../types/product";
import BestSallersProduct from "./BestSallersProduct";
import HighlightBar from "./HighlightBar";
import { FaArrowLeft } from "react-icons/fa";
interface BestSellersProps {
  products: Product[] | undefined;
}
function BestSellers({ products }: BestSellersProps) {
  return (
    <div className="mt-16 mx-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg md:text-2xl font-semibold mb-4">پر فروش ترین ها</h2>
        <Link to="/products" className="flex items-center gap-2 text-lg">
          <span>تمام محصولات</span>
          <FaArrowLeft />
        </Link>
      </div>
      <HighlightBar />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 gap-y-6 mt-10">
        {products?.slice(0, 12).map(product => (
          <BestSallersProduct
            name={product.name}
            img={product.image}
            price={product.price}
            id={product.id}
            discount={product.discount}
          />
        ))}
      </div>
    </div>
  );
}

export default BestSellers;
