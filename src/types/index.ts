import { Types } from "mongoose";

export interface OperationalError extends Error {
  statusCode: number;
  status: string;
  isOperational?: boolean;
}

export interface IProduct {
  name: string;
  slug: string;
  description: string;

  image: string;
  images?: string[];

  countInStock: number; // default: 1
  isAvailable: boolean; // default: true

  brand: string;
  category: string;

  rating: number; // default: 4.5
  numReviews: number; // default: 1

  price: number;
  discount: number; // default: 0
  discountedPrice?: number; // Virtual Property
}

export interface IUser {
  _id: Types.ObjectId;

  name: string;
  email: string;
  photo?: string;
  role: "user" | "admin"; // default: user
  active: boolean; // default: true

  password: string;
  passwordConfirmation?: string;
  passwordChangedAt?: Date;
  passwordResetToken?: String;
  passwordResetExpires?: Number;

  correctPassword: (candidate_password: string) => Promise<boolean>;
  signToken: () => string;
  changePasswordAfter: (jwtTimeStamp: number) => boolean;
  createPasswordResetToken: () => string;
}
