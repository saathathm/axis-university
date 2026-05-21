import { createSlice } from "@reduxjs/toolkit";

export const tokenKey = "axis_admin_token";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: window.localStorage.getItem(tokenKey),
    user: null,
    status: "idle",
    error: null,
  },
  reducers: {
    loginRequest(state, action) {
      return {
        ...state,
        status: "loading",
        error: null,
      };
    },

    loginSuccess(state, action) {
      return {
        ...state,
        status: "authenticated",
        accessToken: action.payload.accessToken,
        user: action.payload.user,
      };
    },

    loginFail(state, action) {
      return {
        ...state,
        status: "failed",
        error: action.payload,
      };
    },

    logoutSuccess(state, action) {
      return {
        ...state,
        status: "idle",
        accessToken: null,
        user: null,
      };
    },

    hydrateAuth(state, action) {
      return {
        ...state,
        accessToken: window.localStorage.getItem(tokenKey),
      };
    },

    clearAuthState(state, action) {
      return {
        ...state,
        status: "idle",
        error: null,
      };
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  logoutSuccess,
  hydrateAuth,
  clearAuthState,
} = authSlice.actions;

export default authSlice.reducer;
