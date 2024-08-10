import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../axios.config";
import toast from "react-hot-toast";

const initialState = {
  loading: false,
  error: null,
  userData: [],
};

export const CREATE_ACCOUNT = createAsyncThunk(
  "user/CREATE_ACCOUNT",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/user/create", data);
      return fulfillWithValue(response?.data?.data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const LOGIN_ACCOUNT = createAsyncThunk(
  "user/LOGIN_ACCOUNT",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/api/user/login", data);
      return fulfillWithValue(response?.data?.data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const GET_DATA_BY_USER = createAsyncThunk(
  "user/GET_DATA_BY_USER",
  async ({ userId }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/api/user/get-user-data?userId=${userId}`
      );
      return fulfillWithValue(response?.data?.data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const UPLOAD_PROFILE_IMAGE = createAsyncThunk(
  "user/UPLOAD_PROFILE_IMAGE",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/api/user/profile-image",
        data
      );
      return fulfillWithValue(response?.data?.data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const USER_BIO = createAsyncThunk(
  "user/USER_BIO",
  async (data, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        "/api/user/profile-update",
        data
      );
      return fulfillWithValue(response?.data?.data);
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CREATE_ACCOUNT.pending, (state) => {
        state.loading = true;
        toast.loading("Creating account...");
      })
      .addCase(CREATE_ACCOUNT.fulfilled, (state, action) => {
        state.loading = false;
        toast.dismiss();
        toast.success("Account created successfully");
      })
      .addCase(CREATE_ACCOUNT.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.dismiss();
        toast.error(action.payload);
      });

    builder.addCase(LOGIN_ACCOUNT.pending, (state) => {
      state.loading = true;
      toast.loading("Logging in...");
    });

    builder.addCase(LOGIN_ACCOUNT.fulfilled, (state, action) => {
      state.loading = false;
      toast.dismiss();
      toast.success("Login successful");
      const storeData = JSON.stringify(action.payload);
      localStorage.setItem("userData", storeData);
      localStorage.setItem("authToken", action.payload.token);
    });

    builder.addCase(LOGIN_ACCOUNT.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      toast.dismiss();
      toast.error(action.payload);
    });

    builder
      .addCase(UPLOAD_PROFILE_IMAGE.pending, (state) => {
        state.loading = true;
        toast.loading("Uploading profile image...");
      })
      .addCase(UPLOAD_PROFILE_IMAGE.fulfilled, (state, action) => {
        state.loading = false;
        toast.dismiss();
        toast.success("Profile image uploaded successfully");
      })
      .addCase(UPLOAD_PROFILE_IMAGE.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.dismiss();
        toast.error(action.payload);
      });
  },
});

export default userSlice.reducer;
