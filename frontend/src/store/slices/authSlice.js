import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "@/services/api";

const tokenKey = "axis_admin_token";

export const loginAdmin = createAsyncThunk(
  "auth/loginAdmin",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/login", credentials);
      const { access_token: accessToken, user } = response.data;
      window.localStorage.setItem(tokenKey, accessToken);
      return { accessToken, user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed.");
    }
  },
);

export const logoutAdmin = createAsyncThunk("auth/logoutAdmin", async () => {
  try {
    await api.post("/admin/logout");
  } finally {
    window.localStorage.removeItem(tokenKey);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: window.localStorage.getItem(tokenKey),
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    hydrateAuth(state) {
      state.accessToken = window.localStorage.getItem(tokenKey);
    },
    clearAuthState(state) {
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.status = "authenticated";
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(logoutAdmin.fulfilled, (state) => {
        state.status = "idle";
        state.accessToken = null;
        state.user = null;
      });
  },
});

export const { hydrateAuth, clearAuthState } = authSlice.actions;

export default authSlice.reducer;