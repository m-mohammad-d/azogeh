import React from "react";
import { useParams } from "react-router-dom";
import ProductInfo from "../components/ProductInfo";
import { useDeleteReviewMutation, useGetProductByIdQuery, useGetProductReviewsQuery, useSubmitReviewMutation, useUpdateReviewMutation } from "../services/ApiProduct";
import Spinner from "../components/Spinner";
import ProductDescription from "../components/ProductDescription";
import ProductComments from "../components/ProductComments";
import { addToCart } from "../store/CartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useGetMeQuery } from "../services/UsersApi";
import { FaExclamationTriangle } from "react-icons/fa";
import SimilarProduct from "../components/SimilarProduct";
import MetaTags from "../components/MetaTag";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const { data: productData, error: productError, isLoading: isLoadingProduct } = useGetProductByIdQuery(id as string);
  const { data: reviewsData, error: reviewsError, isLoading: isLoadingReviews, refetch } = useGetProductReviewsQuery(id);
  const { data: userInfo } = useGetMeQuery({});

  const [submitReview] = useSubmitReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();
  const [updateReview] = useUpdateReviewMutation();

  const handleAddToCart = () => {
    if (productData?.data) {
      dispatch(addToCart({ ...productData.data.product }));
      toast.success("محصول به سبد خرید اضافه شد");
    }
  };

  const handleReviewSubmit = async (reviewData: { rating: number; comment: string }) => {
    try {
      await submitReview({ productId: id, ...reviewData }).unwrap();
      toast.success("دیدگاه شما با موفقیت ثبت شد");
      refetch();
    } catch {
      toast.error("خطا در ارسال دیدگاه");
    }
  };

  const handleReviewDelete = async (commentId: string) => {
    try {
      await deleteReview({ productId: id, commentId }).unwrap();
      toast.success("دیدگاه شما با موفقیت حذف شد");
      refetch();
    } catch {
      toast.error("خطا در حذف دیدگاه");
    }
  };

  const handleReviewUpdate = async (commentId: string, updatedData: { rating: number; comment: string }) => {
    try {
      await updateReview({ productId: id, commentId, ...updatedData }).unwrap();
      toast.success("دیدگاه شما با موفقیت ویرایش شد");
      refetch();
    } catch {
      toast.error("خطا در ویرایش دیدگاه");
    }
  };

  if (isLoadingProduct || isLoadingReviews) return <Spinner />;
  if (productError || reviewsError) {
    return (
      <div className="mt-10 flex flex-col items-center space-y-2 text-center text-xl text-gray-600">
        <FaExclamationTriangle className="text-3xl text-red-500" />
        <p className="text-gray-600">متأسفیم، محصول مورد نظر یافت نشد. لطفاً دوباره تلاش کنید یا به صفحه محصولات برگردید.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-16 w-full max-w-screen-xl">
      <MetaTags
        title={`اذوقه | ${productData?.data.product.name || "جزئیات محصول"}`}
        description={productData?.data.product.description || ""}
        keywords="جزئیات محصول, خرید آنلاین, قیمت محصول"
        image={productData?.data.product.image}
        url={`https://azogeh.onrender.com/product/${productData?.data.product.id}`}
      />
      {productData && reviewsData && (
        <>
          <ProductInfo product={productData.data.product} onAddToCart={handleAddToCart} />
          <ProductDescription description={productData.data.product.description || ""} />
          <ProductComments reviews={reviewsData?.data.reviews} onReviewSubmit={handleReviewSubmit} onReviewDelete={handleReviewDelete} onReviewUpdate={handleReviewUpdate} userInfo={userInfo} />
          <SimilarProduct />
        </>
      )}
    </div>
  );
};

export default ProductDetailPage;
