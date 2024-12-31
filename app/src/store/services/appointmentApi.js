// services/appointmentApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseAPIUrl } from "../../utils/constants.js";
import { getBearerToken } from "../../utils/auth.js";

export const appointmentApi = createApi({
  reducerPath: "appointmentApi",
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
    getAppointments: builder.query({
      query: () => "appointments",
    }),

    getAppointment: builder.query({
      query: (appointmentId) => `appointments/${appointmentId}`,
    }),

    createAppointment: builder.mutation({
      query: (appointmentData) => ({
        url: "appointments",
        method: "POST",
        body: appointmentData,
      }),
    }),
  }),
});

export const {
  useGetAppointmentsQuery,
  useGetAppointmentQuery,
  useCreateAppointmentMutation,
} = appointmentApi;
