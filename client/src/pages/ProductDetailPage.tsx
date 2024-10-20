import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import { useGetProductByIdQuery } from "../services/ApiProduct";
import Spinner from "../components/Spinner";
import ProductDescription from "../components/ProductDescription";
import ProductComments from "../components/ProductComments";
import { addItem } from "../store/CartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function ProductDetailPage() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetProductByIdQuery(id as string);
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (data?.data) {
      dispatch(
        addItem({
          ...data.data.product,
        }),
      );
    }
    toast.success("محصول به سبد خرید اضافه شد");
  };

  if (isLoading) return <Spinner />;
  if (error) return <div>Error fetching product.</div>;

  return (
    <div className="max-w-screen-xl mx-auto mt-16">
      {data?.data && (
        <ProductInfo
          title={data?.data.product.name}
          brand={data?.data.product.brand}
          category={data?.data.product.category}
          sales={data?.data.product.numReviews}
          rating={data?.data.product.rating}
          mainImageUrl={`/public/images/${data?.data.product.image}`}
          altText={data?.data.product.name}
          imageCarousel={data?.data.product?.images?.map(img => `/public/images/${img}`)}
          productId={data?.data.product._id}
          onAddToCart={handleAddToCart}
          price={data?.data.product.price}
          discountedPrice={data?.data.product.discountedPrice}
        />
      )}
      <ProductDescription description={data?.data?.product?.description || ""} />
      <ProductComments />
    </div>
  );
}

export default ProductDetailPage;
