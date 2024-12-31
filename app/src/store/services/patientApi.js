import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseAPIUrl } from "../../utils/constants.js";
import { getBearerToken } from "../../utils/auth.js";

export const patientApi = createApi({
  reducerPath: "patientApi",
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
    getPatients: builder.query({
      query: () => "patients",
    }),
    getPatient: builder.query({
      query: (patientId) => `patients/${patientId}`,
    }),
  }),
});

export const { useGetPatientsQuery, useGetPatientQuery } = patientApi;
