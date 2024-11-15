import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllUsersResponse } from "../types/UserType";
import { setCredentials } from "../store/AuthSlice";

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
      api.dispatch(setCredentials({ token }));
    }

    return result;
  },
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
    deleteUser: builder.mutation({
      query: userId => ({
        url: `/${userId}`,
        method: "DELETE",
      }),
    }),
    getMe: builder.query({
      query: () => "/get-me",
      providesTags: [{ type: "userInfo" }],
    }),
    getAllUser: builder.query<GetAllUsersResponse, void>({
      query: () => "/",
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
  useDeleteUserMutation,
} = apiSlice;

export default apiSlice;
