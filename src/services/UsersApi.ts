import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllUsersResponse, GetUsersCountResponse } from "../types/UserType";
import { API_BASE_URL } from "../config";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_BASE_URL}/users`,
    credentials: "include",
  }),
  tagTypes: ["userInfo"],
  endpoints: builder => ({
    signUp: builder.mutation({
      query: userData => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["userInfo"],
    }),
    login: builder.mutation({
      query: userData => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
      invalidatesTags: ["userInfo"],
    }),
    updateInfo: builder.mutation({
      query: userData => ({
        url: "/update-me",
        method: "PATCH",
        body: userData,
      }),
      invalidatesTags: ["userInfo"],
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
        method: "POST",
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
    deleteUser: builder.mutation({
      query: userId => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "post",
      }),
      invalidatesTags: ["userInfo"],
    }),
    getMe: builder.query({
      query: () => "/get-me",
      providesTags: [{ type: "userInfo" }],
    }),
    getAllUser: builder.query<GetAllUsersResponse, { sort?: string }>({
      query: ({ sort }) => `/?${sort ? `sort=${sort}` : ""}`,
    }),
    getUsersCount: builder.query<GetUsersCountResponse, { period: string }>({
      query: ({ period }) => `/get-users-count?period=${period}`,
    }),
  }),
});

export const {
  useSignUpMutation,
  useGetUsersCountQuery,
  useLoginMutation,
  useUpdateInfoMutation,
  useGetMeQuery,
  useUpdatePasswordMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useLogoutMutation,
} = apiSlice;

export default apiSlice;
