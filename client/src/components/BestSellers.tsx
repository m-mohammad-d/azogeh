import { Product } from "../types/product";
import BestSallersProduct from "./BestSallersProduct";
import HighlightBar from "./HighlightBar";
interface BestSellersProps {
  products: Product[] | undefined;
}
function BestSellers({ products }: BestSellersProps) {
  return (
    <div className="mt-16 mx-4">
      <h2 className="text-lg md:text-3xl font-semibold mb-4">پر فروش ترین ها</h2>
      <HighlightBar />
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 gap-y-6 mt-10">
        {products?.slice(0, 12).map(product => (
          <BestSallersProduct name={product.name} img={product.image} price={product.price} />
        ))}
      </div>
    </div>
  );
}

export default BestSellers;
