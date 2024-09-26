
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchResponse, Product } from "../types/product";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: builder => ({
    getProducts: builder.query<FetchResponse<Product>, { availableOnly: boolean; minPrice: number; maxPrice: number }>({
      query: ({ availableOnly, minPrice, maxPrice }) =>
        `products?page=1&isAvailable=${availableOnly}&price[gte]=${minPrice}&price[lte]=${maxPrice}`,
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
