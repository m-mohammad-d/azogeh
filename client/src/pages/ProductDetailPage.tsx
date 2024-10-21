import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import { useGetProductByIdQuery, useGetProductReviewsQuery, useSubmitReviewMutation } from "../services/ApiProduct";
import Spinner from "../components/Spinner";
import ProductDescription from "../components/ProductDescription";
import ProductComments from "../components/ProductComments";
import { addItem } from "../store/CartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, error: productError, isLoading: isLoadingProduct } = useGetProductByIdQuery(id as string);
  const { data: reviews, error: reviewsError, isLoading: isLoadingReviews, refetch } = useGetProductReviewsQuery(id);
  const [submitReview] = useSubmitReviewMutation();
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (data?.data) {
      dispatch(addItem({ ...data.data.product }));
      toast.success("محصول به سبد خرید اضافه شد");
    }
  };

  const handleReviewSubmit = async (reviewData: { rating: number; comment: string }) => {
    try {
      await submitReview({ productId: id, ...reviewData }).unwrap();
      toast.success("دیدگاه شما با موفقیت ثبت شد");
      refetch();
    } catch (error) {
      toast.error("خطا در ارسال دیدگاه");
    }
  };

  if (isLoadingProduct || isLoadingReviews) return <Spinner />;
  if (productError || reviewsError) return <div>Error fetching product or reviews.</div>;

  return (
    <div className="max-w-screen-xl mx-auto mt-16">
      <ProductInfo product={data?.data?.product} onAddToCart={handleAddToCart} />
      <ProductDescription description={data?.data?.product?.description || ""} />
      <ProductComments reviews={reviews?.data.reviews} onReviewSubmit={handleReviewSubmit} />
    </div>
  );
}

export default ProductDetailPage;
