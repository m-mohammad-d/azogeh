// Define types for Product and User
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  passwordChangedAt?: string;
  passwordResetExpires?: string;
  passwordResetToken?: string;
  id: string;
}


// Define type for Review
export interface Review {
  _id: string;
  comment: string;
  rating: number;
  user: User;
}

// Define type for API Response
export interface ReviewsResponse {
  status: string;
  results: number;
  pagination: number;
  data: {
    reviews: Review[];
  };
}
