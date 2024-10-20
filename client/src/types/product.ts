export interface FetchResponse<T> {
  status: string; // Status of the response (e.g., "success")
  results: number; // Number of results returned
  pagination?: Pagination; // Pagination details
  data: Data<T>; // Data containing the products
}

export interface Pagination {
  total: number; // Total number of items
  limit: number; // Limit of items per page
  pages: number; // Total number of pages
  page: number; // Current page number
  skip: number; // Number of items skipped
}

export interface Data<T> {
  products: T[]; // Array of products
}

export interface Product {
  _id: string; // Unique identifier for the product
  name: string; // Name of the product
  description: string; // Description of the product
  image: string; // Main image of the product
  images: string[]; // Array of additional images
  countInStock: number; // Number of items in stock
  isAvailable: boolean; // Availability status
  brand: string; // Brand of the product
  category: string; // Category of the product
  rating: number; // Product rating
  numReviews: number; // Number of reviews
  price: number; // Original price of the product
  discount: number; // Discount percentage
  createdAt: string; // Creation date of the product
  updatedAt: string; // Last update date of the product
  slug: string; // URL-friendly identifier
  discountedPrice: number; // Price after discount
  id: string; // Alternate unique identifier for the product
}

export interface FetchResponseproduct<T> {
  status: string; // Status of the response (e.g., "success")
  data: { product: T };
}
