import { configureStore } from "@reduxjs/toolkit";
import { doctorApi } from "./services/doctorApi.js";
import { authApi } from "./services/authApi.js";
import authReducer from "./features/authSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [doctorApi.reducerPath]: doctorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, doctorApi.middleware),
});
