import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaStar } from "react-icons/fa";
import SmallSpinner from "./SmallSpinner";

// Zod schema for form validation
const editReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(5).max(500),
});

type EditReviewFormValues = z.infer<typeof editReviewSchema>;

interface EditReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: { rating: number; comment: string }) => void;
  currentReview: { rating: number; comment: string } | null;
}

const EditReviewModal: React.FC<EditReviewModalProps> = ({ isOpen, onClose, onConfirm, currentReview }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<EditReviewFormValues>({
    resolver: zodResolver(editReviewSchema),
  });

  const [rating, setRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (currentReview) {
      setValue("rating", currentReview.rating);
      setValue("comment", currentReview.comment);
      setRating(currentReview.rating);
    }
  }, [currentReview, setValue]);

  const onSubmit = async (data: EditReviewFormValues) => {
    setIsSubmitting(true);
    try {
      await onConfirm({ ...data, rating });
      reset();
      setRating(0);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">ویرایش دیدگاه</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-700">امتیاز:</label>
            <div className="flex mb-2 space-x-1">
              {[1, 2, 3, 4, 5].map(star => (
                <FaStar
                  key={star}
                  size={35}
                  className={`cursor-pointer transition-colors ${
                    errors.rating ? "text-gray-300" : star <= rating ? "text-yellow-400" : "text-gray-300"
                  } hover:text-yellow-500`}
                  onClick={() => {
                    setRating(star);
                    setValue("rating", star);
                  }}
                />
              ))}
            </div>
            {errors.rating && <p className="text-red-500 text-sm mt-1">لطفاً یک امتیاز بین ۱ تا ۵ انتخاب کنید.</p>}
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium mb-2 text-gray-700">نظرات:</label>
            <textarea
              {...register("comment")}
              className="w-full border border-gray-300 rounded-xl p-3 transition-shadow focus:shadow-md focus:outline-none"
              rows={6}
              placeholder="دیدگاه خود را بنویسید..."
            ></textarea>
            {errors.comment && (
              <p className="text-red-500 text-sm mt-1">لطفاً دیدگاه خود را با حداقل ۵ کاراکتر وارد کنید.</p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              className="bg-red-500 text-white px-5 py-3 rounded-xl shadow-md hover:bg-red-600 transition-all"
              onClick={onClose}
            >
              انصراف
            </button>
            <button
              type="submit"
              className={`bg-primary-500 text-white px-5 py-3 rounded-xl shadow-md hover:bg-primary-600 transition-all ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? <SmallSpinner /> : "ثبت تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditReviewModal;