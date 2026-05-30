import axiosInstance from "../../services/axiosInstance.js";

import {
  getDashboardRequest,
  getDashboardSuccess,
  getDashboardFailure,
} from "./dashboardSlice.js";

export const getDashboardData = () => async (dispatch) => {
  try {
    dispatch(getDashboardRequest());

    const { data } = await axiosInstance.get("/api/dashboard");

    dispatch(getDashboardSuccess(data.data));
  } catch (error) {
    dispatch(
      getDashboardFailure(
        error.response?.data?.message || "Failed to fetch dashboard data",
      ),
    );
  }
};
