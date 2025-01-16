import React from "react";
import { FaRegStar } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";

interface RatingProps {
  totalStars?: number;
  filledStars: number;
  className?: string;
}

const Rating: React.FC<RatingProps> = ({ totalStars = 5, filledStars, className }) => {
  return (
    <div className={`flex gap-1 ${className}`}>
      {Array.from({ length: totalStars }, (_, index) =>
        index < filledStars ? <IoIosStar key={index} className="text-yellow-500" size={20} /> : <FaRegStar key={index} className="text-yellow-500" size={20} />,
      )}
    </div>
  );
};

export default Rating;
