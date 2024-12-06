import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderResponse } from "../types/OrderType";

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
    getAllOrder: builder.query<OrderResponse, void>({
      query: () => `orders`,
    }),
    getMyOrders: builder.query<OrderResponse, { sort: string }>({
      query: ({ sort }) => `orders/get-myorders?sort=${sort}`,
    }),
  }),
});

export const { useCreateOrderMutation, useGetAllOrderQuery, useGetMyOrdersQuery } = OrderApi;
