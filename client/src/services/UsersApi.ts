import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "api/users",
    prepareHeaders: headers => {
      const token = localStorage.getItem("token"); // دریافت توکن از localStorage
      if (token) {
        headers.set("Authorization", `Bearer ${token}`); // اضافه کردن توکن به هدر
      }
      return headers;
    },
  }),
  endpoints: builder => ({
    signUp: builder.mutation({
      query: userData => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: userData => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useSignUpMutation, useLoginMutation } = apiSlice;
export default apiSlice;
