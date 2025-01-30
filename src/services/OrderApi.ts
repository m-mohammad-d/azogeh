import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderListResponse, OrderRequest, TopSellingProductResponse } from "../types/OrderType";

export const OrderApi = createApi({
  reducerPath: "OrderApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["order"],
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
      providesTags: [{ type: "order" }],
    }),

    getMyOrders: builder.query<OrderListResponse, { sort: string; isPaid?: boolean; isDelivered?: boolean }>({
      query: ({ sort, isPaid, isDelivered }) => {
        let query = `orders/get-myorders?sort=${sort}`;

        if (isPaid !== undefined) query += `&isPaid=${isPaid}`;
        if (isDelivered !== undefined) query += `&isDelivered=${isDelivered}`;

        return query;
      },
      providesTags: [{ type: "order" }],
    }),
    getOneOrder: builder.query<OrderRequest, { id: string | undefined }>({
      query: ({ id }) => `/orders/${id}`,
      providesTags: [{ type: "order" }],
    }),
    payOrder: builder.mutation({
      query: ({ orderId }) => ({
        url: `/orders/${orderId}/pay`,
        method: "PATCH",
      }),
      invalidatesTags: ["order"],
    }),
    deliverOrder: builder.mutation({
      query: ({ orderId }) => ({
        url: `/orders/${orderId}/deliver`,
        method: "PATCH",
      }),
      invalidatesTags: ["order"],
    }),
    topSellingProducts: builder.query<TopSellingProductResponse, { limit: number | undefined }>({
      query: ({ limit }) => `/orders/top-selling-products?limit=${limit}`,
      providesTags: [{ type: "order" }],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOneOrderQuery,
  useGetAllOrderQuery,
  useGetMyOrdersQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
  useTopSellingProductsQuery,
} = OrderApi;
