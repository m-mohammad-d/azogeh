import { Product } from "../types/product";
import BestSallersProduct from "./BestSallersProduct";
import HighlightBar from "./HighlightBar";
interface BestSellersProps {
  products: Product[] | undefined;
}
function BestSellers({ products }: BestSellersProps) {
  return (
    <div className="mt-16">
      <h2 className="text-3xl">پر فروش ترین ها</h2>
      <HighlightBar />
      <div className="grid grid-cols-6 gap-x-5 gap-y-7 mt-10">
        {products?.slice(0, 12).map(product => (
          <BestSallersProduct name={product.name} img={product.image} price={product.price} />
        ))}
      </div>
    </div>
  );
}

export default BestSellers;
