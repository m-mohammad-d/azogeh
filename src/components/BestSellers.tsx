import { Link } from "react-router-dom";
import { Product } from "../types/product";
import BestSallersProduct from "./ProductCard";
import HighlightBar from "./HighlightBar";
import { FaArrowLeft } from "react-icons/fa";

interface BestSellersProps {
  products: Product[] | undefined;
}

function BestSellers({ products }: BestSellersProps) {
  return (
    <div className="mx-4 mt-16">
      <div className="flex items-center justify-between">
        <h2 className="mb-4 text-lg font-semibold md:text-2xl">پر فروش ترین ها</h2>
        <Link to="/products" className="flex items-center gap-2 text-lg">
          <span>تمام محصولات</span>
          <FaArrowLeft />
        </Link>
      </div>
      <HighlightBar />
      <div className="mt-10 grid justify-items-center gap-4 gap-y-6 grid-cols-2 md:grid-cols-4">{products?.slice(0, 8).map((product) => <BestSallersProduct key={product._id} product={product} />)}</div>
    </div>
  );
}

export default BestSellers;
