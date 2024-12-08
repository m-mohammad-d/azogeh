import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderListResponse, OrderRequest } from "../types/OrderType";

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
    getAllOrder: builder.query<OrderListResponse, { sort: string }>({
      query: ({ sort }) => `orders?sort=${sort}`,
    }),
    getMyOrders: builder.query<OrderListResponse, { sort: string }>({
      query: ({ sort }) => `orders/get-myorders?sort=${sort}`,
    }),
    getOneOrder: builder.query<OrderRequest, { id: string | undefined }>({
      query: ({ id }) => `/orders/${id}`,
    }),
  }),
});

export const { useCreateOrderMutation, useGetOneOrderQuery, useGetAllOrderQuery, useGetMyOrdersQuery } = OrderApi;
