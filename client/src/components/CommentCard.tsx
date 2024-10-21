import React from "react";
import { Review } from "../types/reviewsType";
import { FaTrash, FaEdit } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { useUser } from "../Context/UserProvider";

interface CommentCardProps {
  review: Review;
}

const CommentCard: React.FC<CommentCardProps> = ({ review }) => {
  const defaultProfileImage =
    "https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars.png";
  const user = useUser();
  

  return (
    <div className="border rounded-lg p-4 shadow-md bg-white flex gap-4 items-start">
      <div className="flex-shrink-0">
        <img
          src={defaultProfileImage}
          alt={`${review.user.name}'s profile`}
          className="w-12 h-12 rounded-full object-cover border border-gray-300"
        />
      </div>
      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{review.user.name}</h3>
          {user.data.user.id === review.user._id && (
            <div className="flex gap-2">
              <FaEdit className="cursor-pointer text-blue-500 hover:text-blue-700 transition-colors" />
              <FaTrash className="cursor-pointer text-red-500 hover:text-red-700 transition-colors" />
            </div>
          )}
        </div>

        {/* Star Rating Display */}
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map(star => (
            <FaStar key={star} className={`text-xl ${review.rating >= star ? "text-yellow-500" : "text-gray-300"}`} />
          ))}
        </div>

        <p className="text-gray-700 mt-2">{review.comment}</p>
      </div>
    </div>
  );
};

export default CommentCard;
