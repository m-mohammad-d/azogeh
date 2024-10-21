import React from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import {
  useDeleteReviewMutation,
  useGetProductByIdQuery,
  useGetProductReviewsQuery,
  useSubmitReviewMutation,
} from "../services/ApiProduct";
import Spinner from "../components/Spinner";
import ProductDescription from "../components/ProductDescription";
import ProductComments from "../components/ProductComments";
import { addItem } from "../store/CartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, error: productError, isLoading: isLoadingProduct } = useGetProductByIdQuery(id as string);
  const { data: reviews, error: reviewsError, isLoading: isLoadingReviews, refetch } = useGetProductReviewsQuery(id);
  const [submitReview] = useSubmitReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

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

  const handleReviewDelete = async (commentId: string) => {
    try {
      await deleteReview({ productId: id, commentId }).unwrap();
      toast.success("دیدگاه شما با موفقیت حذف شد");
      refetch();
    } catch (error) {
      toast.error("خطا در حذف دیدگاه");
    }
  };

  if (isLoadingProduct || isLoadingReviews) return <Spinner />;
  if (productError || reviewsError) return <div>Error fetching product or reviews.</div>;

  return (
    <div className="max-w-screen-xl mx-auto mt-16">
      <ProductInfo product={data?.data?.product} onAddToCart={handleAddToCart} />
      <ProductDescription description={data?.data?.product?.description || ""} />
      <ProductComments
        reviews={reviews?.data.reviews}
        onReviewSubmit={handleReviewSubmit}
        onReviewDelete={handleReviewDelete}
      />
    </div>
  );
};

export default ProductDetailPage;
