import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loading: false,
    data: null,
  },
  reducers: {
    getDashboardRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },

    getDashboardSuccess(state, actions) {
      return {
        ...state,
        data: actions.payload,
        loading: false,
      };
    },

    getDashboardFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    clearDashboardError(state) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  getDashboardRequest,
  getDashboardSuccess,
  getDashboardFailure,
  clearDashboardError,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
