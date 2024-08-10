import { configureStore } from "@reduxjs/toolkit";
import publicSlice from "./features/publicSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    publicReducer: publicSlice,
    userReducer: userSlice,
  },
});
