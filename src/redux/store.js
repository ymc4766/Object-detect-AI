import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import authSlice from "./authSlice";
import faceSlice from "./faceSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    facerecognition: faceSlice,

    // posts: postSlice,
    // category: categorySlice,
    // chat: chatSlice,
    // notification: notificationSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

export default store;
