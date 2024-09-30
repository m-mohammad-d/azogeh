import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import { useGetProductByIdQuery } from "../services/ApiProduct";
import Spinner from "../components/Spinner";
import ProductDescription from "../components/ProductDescription";

function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id as string);
  

  if (isLoading) return <Spinner />;
  if (error) return <div>Error fetching product.</div>;

  return (
    <div className="max-w-screen-2xl mx-auto mt-16">
      {product && (
        <ProductInfo
          title={product.product.name}
          brand={product.product.brand}
          category={product.product.category}
          sales={product.product.numReviews}
          rating={product.product.rating}
          mainImageUrl={`/public/images/${product.product.image}`}
          altText={product.product.name}
          imageCarousel={product.product?.images?.map(img => `/public/images/${img}`)}
        />
      )}
      <ProductDescription description={product?.product.description}/>
    </div>
  );
}

export default ProductDetailPage;
