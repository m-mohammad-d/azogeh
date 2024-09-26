import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FetchResponse, Product } from "../types/product";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  endpoints: builder => ({
    getProducts: builder.query<
      FetchResponse<Product>,
      {
        availableOnly: boolean;
        minPrice: number;
        maxPrice: number;
        brand: string;
        category: string;
      }
    >({
      query: ({ availableOnly, minPrice, maxPrice, brand, category }) => {
        let queryString = `products?page=1&isAvailable=${availableOnly}&price[gte]=${minPrice}&price[lte]=${maxPrice}`;

        if (brand && brand !== "all") {
          queryString += `&brand=${brand}`;
        }

        if (category && category !== "all") {
          queryString += `&category=${category}`;
        }

        return queryString;
      },
    }),
  }),
});

export const { useGetProductsQuery } = productsApi;
