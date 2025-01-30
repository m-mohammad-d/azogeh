
import { useGetProductsQuery } from "../services/ApiProduct";
import Spinner from "./Spinner";
import HighlightBar from "./HighlightBar";
import ProductCard from "./ProductCard";

function SimilarProduct() {
  const { data: products, isLoading } = useGetProductsQuery();

  if (isLoading) return <Spinner />;
  return (
    <div>
      <div className="mx-4 mt-16">
        <div className="flex items-center justify-between">
          <h2 className="mb-2 text-lg text-primary font-semibold md:text-xl">محصولات مشابه</h2>
        </div>
        <HighlightBar />
        <div className="mt-10 grid grid-cols-1 justify-items-center gap-4 gap-y-6 sm:grid-cols-2 md:grid-cols-4">
          {products?.data.products?.slice(0, 4).map((product) => <ProductCard key={product._id} product={product} />)}
        </div>
      </div>
    </div>
  );
}

export default SimilarProduct;
