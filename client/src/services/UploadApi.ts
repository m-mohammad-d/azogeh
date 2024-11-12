import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const imageApi = createApi({
  reducerPath: "imageApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: builder => ({
    uploadImage: builder.mutation<{ data: { image: string } }, FormData>({
      query: formData => ({
        url: "upload",
        method: "POST",
        body: formData,
      }),
    }),
  }),
});

export const { useUploadImageMutation } = imageApi;

