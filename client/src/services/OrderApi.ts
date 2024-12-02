import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  }),
});

export const { useCreateOrderMutation } = OrderApi;
