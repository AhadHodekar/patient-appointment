import { configureStore } from "@reduxjs/toolkit";
import { doctorApi } from "./services/doctorApi.js";
import { authApi } from "./services/authApi.js";
import { patientApi } from "./services/patientApi.js";
import { appointmentApi } from "./services/appointmentApi.js";
import authReducer from "./features/authSlice.js";
import walletReducer from "./features/walletSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wallet: walletReducer,
    [authApi.reducerPath]: authApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
    [patientApi.reducerPath]: patientApi.reducer,
    [appointmentApi.reducerPath]: appointmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      doctorApi.middleware,
      patientApi.middleware,
      appointmentApi.middleware,
    ),
});
