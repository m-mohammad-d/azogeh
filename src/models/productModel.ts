import { model, Schema } from "mongoose";
import slugify from "slugify";

interface IProduct {
  name: string;
  slug: string;
  description: string;

  image: string;
  images: string[];

  countInStock: number;
  isAvailable: boolean;

  brand: string;
  category: string;

  rating: number;
  numReviews: number;

  price: number;
  discount: number;
  discountedPrice: number;
}

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
      default: false,
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
  { toJSON: { virtuals: true }, toObject: { virtuals: true }, timestamps: true },
);

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

productSchema.virtual("discountedPrice").get(function () {
  if (this.discount === 0) return null;

  const discountMultiplier = 1 - this.discount / 100;
  return this.price * discountMultiplier;
});

const Product = model<IProduct>("Product", productSchema);
export default Product;
