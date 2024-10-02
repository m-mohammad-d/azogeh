import React from "react";

interface Review {
  name: string;
  text: string;
  buyer: boolean;
  profileImage: string; // Add profileImage property
}

interface CommentCardProps {
  review: Review;
}

const CommentCard: React.FC<CommentCardProps> = ({ review }) => {
  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white flex gap-4 items-start">
      <div className="flex-shrink-0">
        <img
          src={review.profileImage}
          alt={`${review.name}'s profile`}
          className="w-12 h-12 rounded-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{review.name}</h3>
          {review.buyer && (
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">خریدار تایید شده</span>
          )}
        </div>
        <p className="text-gray-700 mt-2">{review.text}</p>
        <div className="flex justify-end">
          <button className="text-blue-500 text-sm">گزارش</button>
        </div>
      </div>
    </div>
  );
};

export default CommentCard;
