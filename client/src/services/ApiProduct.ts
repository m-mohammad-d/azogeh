import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchResponse, Product } from "../types/product";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: builder => ({
    getProducts: builder.query<
      FetchResponse<Product>,
      {
        availableOnly?: boolean;
        minPrice?: number;
        maxPrice?: number;
        brand?: string;
        page? : number
        category?: string;
      } | void
    >({
      query: params => {
        let queryString = `products?`;

        if (params?.page !== undefined) {
          queryString += `&page=${params.page}`;
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

        return queryString;
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;