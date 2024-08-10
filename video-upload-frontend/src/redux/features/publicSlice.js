import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios.config";

const initialState = {
  publicData: [],
  loading: false,
  error: null,
};

export const GET_PUBLIC_DATA = createAsyncThunk(
  "public/GET_PUBLIC_DATA",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/api/listing-page");
      return fulfillWithValue(response?.data?.data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

const publicSlice = createSlice({
  name: "public",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(GET_PUBLIC_DATA.pending, (state) => {
        state.loading = true;
      })
      .addCase(GET_PUBLIC_DATA.fulfilled, (state, action) => {
        state.loading = false;
        state.publicData = action.payload;
      })
      .addCase(GET_PUBLIC_DATA.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default publicSlice.reducer;
