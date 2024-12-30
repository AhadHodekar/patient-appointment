import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseAPIUrl } from "../../utils/constants.js";

const getBearerToken = () => {
  return localStorage.getItem("accessToken") || "";
};

export const doctorApi = createApi({
  reducerPath: "doctorApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseAPIUrl,
    prepareHeaders: (headers) => {
      const token = getBearerToken();
      if (token) {
        headers.set(`Authorization`, `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getDoctors: builder.query({
      query: () => "doctors",
    }),
  }),
});

export const { useGetDoctorsQuery } = doctorApi;
