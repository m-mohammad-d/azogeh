import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Response } from "../types/OrderType";

export const OrderApi = createApi({
  reducerPath: "OrderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: builder => ({
    createOrder: builder.mutation({
      query: formData => ({
        url: "orders",
        method: "POST",
        body: formData,
      }),
    }),
    getAllOrder: builder.query<Response, void>({
      query: () => `orders`,
    }),
  }),
});

export const { useCreateOrderMutation, useGetAllOrderQuery } = OrderApi;
