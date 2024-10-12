import { model, Schema } from "mongoose";
import slugify from "slugify";
import { IProduct } from "../types";

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },

    image: {
      type: String,
      required: [true, "Product image is required"],
    },
    images: {
      type: [String],
    },

    countInStock: {
      type: Number,
      default: 1,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },

    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },

    rating: {
      type: Number,
      default: 4.5,
    },
    numReviews: {
      type: Number,
      default: 1,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

//////////// Virtual Property ////////////

productSchema.virtual("discountedPrice").get(function () {
  const defaultValue = 0;
  if (this.discount === defaultValue) return null;

  const discountMultiplier = 1 - this.discount / 100;
  return this.price * discountMultiplier;
});

//////////// Document Middleware ////////////

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = model<IProduct>("Product", productSchema);
export default Product;
