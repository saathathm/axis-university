import {
  loginRequest,
  loginSuccess,
  loginFailure,
  loadUserRequest,
  loadUserSuccess,
  loadUserFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
} from "./authSlice.js";

import axiosInstance from "../../services/axiosInstance.js";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(loginRequest());

    const { data } = await axiosInstance.post("/api/login", {
      email,
      password,
    });

    localStorage.setItem("token", data.data.token);

    dispatch(loginSuccess(data.data.user));
  } catch (error) {
    localStorage.removeItem("token");

    dispatch(loginFailure(error.response?.data?.message || "Failed to login"));
  }
};

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(loadUserRequest());

    const { data } = await axiosInstance.get("/api/me");

    dispatch(loadUserSuccess(data.data));
  } catch (error) {
    localStorage.removeItem("token");

    dispatch(
      loadUserFailure(
        error.response?.data?.message || "Failed to load user profile",
      ),
    );
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(logoutRequest());

    const { data } = await axiosInstance.post("/api/logout");

    localStorage.removeItem("token");

    dispatch(logoutSuccess(data.message));
  } catch (error) {
    localStorage.removeItem("token");

    dispatch(
      logoutFailure(error.response?.data?.message || "Failed to logout"),
    );
  }
};
