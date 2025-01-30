import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaStar } from "react-icons/fa";
import SmallSpinner from "./SmallSpinner";
import Button from "./Button";
import { cn } from "../utils/util";

// Zod schema for form validation
const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(5).max(500),
});

type ReviewFormValues = z.infer<typeof reviewSchema>;

const AddReviewsModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmit: (data: ReviewFormValues) => void;
}> = ({ isOpen, onClose, onReviewSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
  });

  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!isOpen) return null;

  const onSubmit = async (data: ReviewFormValues) => {
    setIsSubmitting(true);
    try {
      await onReviewSubmit({ ...data, rating });
      reset();
      setRating(0);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStarClick = (star: number) => {
    setRating(star);
    setValue("rating", star);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-3xl font-bold text-gray-800">ثبت دیدگاه</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="mb-2 block text-lg font-medium text-gray-700">رتبه‌بندی شما</label>
            <div className="mb-2 flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={35}
                  className={`cursor-pointer transition-colors ${rating && rating >= star ? "text-yellow-400" : "text-gray-300"} hover:text-yellow-500`}
                  onClick={() => handleStarClick(star)}
                />
              ))}
            </div>
            {errors.rating && <p className="mt-1 text-sm text-red-500">لطفاً یک امتیاز بین ۱ تا ۵ انتخاب کنید.</p>}
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-lg font-medium text-gray-700">دیدگاه شما</label>
            <textarea
              {...register("comment")}
              className={cn("w-full rounded-md border border-neutral-gray-2 p-3 transition-shadow focus:shadow focus:outline-none" , errors.comment && "border-status-error")}
              rows={6}
              placeholder="دیدگاه خود را بنویسید..."
            ></textarea>
            {errors.comment && <p className="mt-1 text-sm text-status-error">لطفاً دیدگاه خود را با حداقل ۵ کاراکتر وارد کنید.</p>}
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" shape={8} className="bg-red-500 hover:bg-red-600 text-base" size="x-small" onClick={onClose}>
              انصراف
            </Button>
            <Button
              type="submit"
              className={`${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? <SmallSpinner /> : "ارسال"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddReviewsModal;
