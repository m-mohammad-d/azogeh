import { model, Schema } from "mongoose";
import slugify from "slugify";

interface IProduct {
  name: string;
  slug?: string;
  description: string;

  imageCover: string;
  images: string[];

  brand: string;
  category: string;

  ratingsAverage?: number;
  ratingsQuantity?: number;

  price: number;
  priceDiscount?: number;

  isAvailable?: boolean;
  countInStock?: number;
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
      required: [true, "Product description is required"],
    },

    imageCover: {
      type: String,
      required: [true, "Product image cover is required"],
    },
    images: {
      type: [String],
      required: [true, "Product images is required"],
    },

    brand: {
      type: String,
      required: [true, "Brand is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },

    ratingsAverage: {
      type: Number,
      default: 0,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    price: {
      type: Number,
      required: [true, "Product Price is required"],
    },
    priceDiscount: {
      type: Number,
      default: 0,
    },

    isAvailable: {
      type: Boolean,
      default: false,
    },
    countInStock: {
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

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Product = model<IProduct>("Product", productSchema);
export default Product;
