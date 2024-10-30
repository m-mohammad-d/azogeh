// apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllUsersResponse } from "../types/UserType";

const baseQuery = fetchBaseQuery({
  baseUrl: "/api/users",
  prepareHeaders: headers => {
    const token = localStorage.getItem("authToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions);

    const token = result?.meta?.response?.headers?.get("x-auth-token");
    if (token) {
      localStorage.setItem("authToken", token);
    }

    return result;
  },
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
    updateInfo: builder.mutation({
      query: userData => ({
        url: "/update-me",
        method: "PATCH",
        body: userData,
      }),
    }),
    updatePassword: builder.mutation({
      query: userData => ({
        url: "/update-me-password",
        method: "PATCH",
        body: userData,
      }),
    }),
    forgetPassword: builder.mutation({
      query: userData => ({
        url: "/forgot-password",
        method: "post",
        body: userData,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ resetToken, password, passwordConfirmation }) => ({
        url: `/reset-password?resetToken=${resetToken}`,
        method: "PATCH",
        body: { password, passwordConfirmation },
      }),
    }),
    getMe: builder.query({
      query: () => "/get-me",
    }),
    getAllUser: builder.query<GetAllUsersResponse, void>({
      query: () => "?role=admin",
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
  useUpdateInfoMutation,
  useGetMeQuery,
  useUpdatePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetAllUserQuery,
} = apiSlice;

export default apiSlice;
