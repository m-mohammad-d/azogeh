import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import { useGetProductByIdQuery } from "../services/ApiProduct";
import Spinner from "../components/Spinner";
import ProductDescription from "../components/ProductDescription";
import ProductComments from "../components/ProductComments";
import { addItem } from "../store/CartSlice";
import { useDispatch } from "react-redux";

function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id as string);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (product) {
      dispatch(
        addItem({
          ...product.product,
        })
      );
    }
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error fetching product.</div>;

  return (
    <div className="max-w-screen-xl mx-auto mt-16">
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
          productId={product.product._id}
          onAddToCart={handleAddToCart}
        />
      )}
      <ProductDescription description={product?.product.description} />
      <ProductComments />
    </div>
  );
}

export default ProductDetailPage;
