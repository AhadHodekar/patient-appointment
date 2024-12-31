import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseAPIUrl } from "../../utils/constants.js";
import { getBearerToken } from "../../utils/auth.js";

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
    getDoctor: builder.query({
      query: (doctorId) => `doctors/${doctorId}`,
    }),
    getDoctorReport: builder.query({
      query: (doctorId) => `reports/doctor/${doctorId}`,
    }),
  }),
});

export const {
  useGetDoctorsQuery,
  useGetDoctorQuery,
  useGetDoctorReportQuery,
} = doctorApi;
