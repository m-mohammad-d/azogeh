import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HighlightBar from "./HighlightBar";
import CommentCard from "./CommentCard";
import AddReviewsModal from "./AddReviewsModal";
import { Review } from "../types/reviewsType";
import { FaLock, FaStar } from "react-icons/fa";
import { GetMeResponse } from "../types/UserType";
import toast from "react-hot-toast";

interface ProductCommentsProps {
  reviews: Review[];
  onReviewSubmit: (reviewData: { rating: number; comment: string }) => void;
  onReviewDelete: (commentId: string) => void;
  onReviewUpdate: (commentId: string, updatedData: { rating: number; comment: string }) => void;
  userInfo: GetMeResponse;
}

const ProductComments: React.FC<ProductCommentsProps> = ({
  reviews,
  onReviewSubmit,
  onReviewDelete,
  onReviewUpdate,
  userInfo,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [visibleReviewsCount, setVisibleReviewsCount] = useState(6);
  const navigate = useNavigate();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const totalReviews = reviews.length;
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews || 0;

  const loadMoreReviews = () => {
    setVisibleReviewsCount(prevCount => prevCount + 6);
  };

  const handleAddReviewClick = () => {
    if (!userInfo) {
      const backUrl = window.location.pathname + window.location.search;
      navigate(`/login?backUrl=${encodeURIComponent(backUrl)}`);

      toast("برای ثبت دیدگاه باید وارد شوید", {
        icon: <FaLock />,
      });
    } else {
      openModal();
    }
  };

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-6 p-6 mt-16">
      {/* Sidebar */}
      <div className="w-full md:w-1/4">
        <div className="border rounded-lg p-4 bg-white shadow-lg relative overflow-hidden space-y-3">
          <h2 className="text-lg font-semibold">امتیاز و دیدگاه کاربران</h2>
          <div className="flex items-center gap-2">
            <p className="text-3xl font-bold text-gray-700">{averageRating.toFixed(1)}</p>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  className={`text-2xl mb-2 ${averageRating >= star ? "text-yellow-500" : "text-gray-300"}`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500">از 5 امتیاز</p>
          <p className={`text-sm ${totalReviews === 0 ? "text-gray-400" : "text-gray-600"}`}>
            بر اساس {totalReviews} امتیاز
          </p>
          <button
            className="relative z-10 mt-4 bg-primary-500 text-white px-4 py-2 rounded-full hover:bg-primary-600 transition-transform transform hover:scale-105 shadow-lg hover:shadow-xl focus:ring focus:ring-primary-300"
            onClick={handleAddReviewClick}
          >
            ثبت دیدگاه
          </button>
        </div>
      </div>
      <div className="flex-1">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2 text-gray-400">نظرات کاربران</h2>
          <HighlightBar />
        </div>

        {reviews.length === 0 ? (
          <div className="text-center text-gray-500 p-6">
            <p>هیچ نظری برای این محصول ثبت نشده است.</p>
            <p>اولین نفری باشید که دیدگاه خود را ثبت می‌کنید!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.slice(0, visibleReviewsCount).map(review => (
              <CommentCard
                key={review._id}
                review={review}
                onReviewDelete={onReviewDelete}
                onReviewUpdate={onReviewUpdate}
                userInfo={userInfo}
              />
            ))}
          </div>
        )}

        {visibleReviewsCount < totalReviews && reviews.length > 0 && (
          <button
            className="mt-4 bg-primary-500 text-white px-4 py-2 rounded hover:bg-primary-600 transition"
            onClick={loadMoreReviews}
          >
            نمایش بیشتر
          </button>
        )}
      </div>

      <AddReviewsModal isOpen={isModalOpen} onClose={closeModal} onReviewSubmit={onReviewSubmit} />
    </div>
  );
};

export default ProductComments;
