import { Schema, model } from "mongoose";
import { IReview, ReviewModel } from "../types";

const reviewSchema = new Schema<IReview>({
  comment: {
    type: String,
    required: [true, "کامنت نظر را وارد کنید"],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: [true, "امتیاز نظر را وارد کنید"],
  },

  // 1 : Many (Parent ref)
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: [true, "آیدی محصول نظر را وارد کنید"],
  },

  // 1 : Many (Parent ref)
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "آیدی کاربر نظر را وارد کنید"],
  },
});

//////////// Query Middleware ////////////

reviewSchema.pre(/^find/, async function (this: Document & IReview, next) {
  this.populate("product user");
  next();
});

const Review = model<IReview, ReviewModel>("Review", reviewSchema);
export default Review;
