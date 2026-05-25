import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: !!localStorage.getItem("token"),
    user: null,
  },
  reducers: {
    loginRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    loginSuccess(state, actions) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: actions.payload,
      };
    },

    loginFailure(state, actions) {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: actions.payload,
      };
    },

    loadUserRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    loadUserSuccess(state, actions) {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: actions.payload,
      };
    },

    loadUserFailure(state, actions) {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: actions.payload,
      };
    },

    logoutRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    logoutSuccess(state, actions) {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        message: actions.payload,
      };
    },

    logoutFailure(state, actions) {
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: actions.payload,
      };
    },

    clearAuthMessage(state, actions) {
      return {
        ...state,
        message: null,
      };
    },

    clearAuthError(state, actions) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  clearAuthMessage,
  clearAuthError,
} = authSlice.actions;

export default authSlice.reducer;
