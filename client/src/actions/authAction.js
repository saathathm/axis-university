import axiosInstance from "../utils/axiosInstance";
import { getError } from "./contentHelper";
import {
  loginFail,
  loginRequest,
  loginSuccess,
  logoutSuccess,
  tokenKey,
} from "../slices/authSlice";

export const loginAdmin = (credentials) => async (dispatch) => {
  try {
    dispatch(loginRequest());
    const { data } = await axiosInstance.post("/admin/login", credentials);
    const accessToken = data.access_token;

    window.localStorage.setItem(tokenKey, accessToken);
    dispatch(loginSuccess({ accessToken, user: data.user }));

    return data;
  } catch (error) {
    const message = getError(error, "Login failed.");
    dispatch(loginFail(message));
    throw message;
  }
};

export const logoutAdmin = () => async (dispatch) => {
  try {
    await axiosInstance.post("/admin/logout");
  } finally {
    window.localStorage.removeItem(tokenKey);
    dispatch(logoutSuccess());
  }
};
