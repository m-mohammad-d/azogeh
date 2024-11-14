import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchResponse, FetchResponseproduct, Product } from "../types/product";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
  prepareHeaders: headers => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  endpoints: builder => ({
    getProducts: builder.query<
      FetchResponse<Product>,
      {
        availableOnly?: boolean;
        minPrice?: number;
        maxPrice?: number;
        brand?: string;
        page?: number;
        sort?: string;
        category?: string;
        search?: string;
      } | void
    >({
      query: params => {
        let queryString = `products?`;

        if (params?.page !== undefined) {
          queryString += `page=${params.page}`;
        }
        if (params?.availableOnly !== undefined) {
          queryString += `&isAvailable=${params.availableOnly}`;
        }
        if (params?.minPrice !== undefined) {
          queryString += `&price[gte]=${params.minPrice}`;
        }
        if (params?.maxPrice !== undefined) {
          queryString += `&price[lte]=${params.maxPrice}`;
        }
        if (params?.brand && params.brand !== "all") {
          queryString += `&brand=${params.brand}`;
        }
        if (params?.category && params.category !== "all") {
          queryString += `&category=${params.category}`;
        }
        if (params?.sort) {
          queryString += `&sort=${params.sort}`;
        }
        if (params?.search) {
          queryString += `&search=${params.search}`;
        }
        return queryString;
      },
    }),
    getProductById: builder.query<FetchResponseproduct<Product>, string>({
      query: id => `products/${id}`,
    }),
    getProductReviews: builder.query({
      query: id => `/products/${id}/reviews`,
    }),
    submitReview: builder.mutation({
      query: ({ productId, rating, comment }) => ({
        url: `/products/${productId}/reviews`,
        method: "POST",
        body: { rating, comment },
      }),
    }),
    deleteReview: builder.mutation({
      query: ({ productId, commentId }) => ({
        url: `/products/${productId}/reviews/${commentId}`,
        method: "DELETE",
      }),
    }),
    updateReview: builder.mutation({
      query: ({ productId, commentId, comment, rating }) => ({
        url: `/products/${productId}/reviews/${commentId}`,
        method: "PATCH",
        body: {
          comment,
          rating,
        },
      }),
    }),
    CreateProduct: builder.mutation({
      query: productData => ({
        url: "/products",
        method: "POST",
        body: productData,
      }),
    }),
    deleteProduct: builder.mutation({
      query: ({ productid }) => ({
        url: `/products/${productid}`,
        method: "DELETE",
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ productId, ...updatedData }) => ({
        url: `/products/${productId}`,
        method: "PATCH",
        body: updatedData,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductReviewsQuery,
  useSubmitReviewMutation,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = productsApi;
