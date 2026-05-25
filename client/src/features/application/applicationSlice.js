import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    loading: false,
    applications: [],
    application: null,
  },
  reducers: {
    createApplicationRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    createApplicationSuccess(state, actions) {
      return {
        ...state,
        loading: false,
        message: actions.payload,
      };
    },

    createApplicationFailure(state, actions) {
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    },

    getApplicationsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getApplicationsSuccess(state, actions) {
      return {
        ...state,
        loading: false,
        applications: actions.payload,
      };
    },

    getApplicationsFailure(state, actions) {
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    },

    getApplicationDetailsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getApplicationDetailsSuccess(state, actions) {
      return {
        ...state,
        loading: false,
        application: actions.payload,
      };
    },

    getApplicationDetailsFailure(state, actions) {
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    },

    approveApplicationRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    approveApplicationSuccess(state, actions) {
      return {
        ...state,
        loading: false,
        message: actions.payload,
      };
    },

    approveApplicationFailure(state, actions) {
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    },

    rejectApplicationRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    rejectApplicationSuccess(state, actions) {
      return {
        ...state,
        loading: false,
        message: actions.payload,
      };
    },

    rejectApplicationFailure(state, actions) {
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    },

    clearApplicationMessage(state, actions) {
      return {
        ...state,
        message: null,
      };
    },

    clearApplicationError(state, actions) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  createApplicationRequest,
  createApplicationSuccess,
  createApplicationFailure,
  getApplicationsRequest,
  getApplicationsSuccess,
  getApplicationsFailure,
  getApplicationDetailsRequest,
  getApplicationDetailsSuccess,
  getApplicationDetailsFailure,
  approveApplicationRequest,
  approveApplicationSuccess,
  approveApplicationFailure,
  rejectApplicationRequest,
  rejectApplicationSuccess,
  rejectApplicationFailure,
  clearApplicationMessage,
  clearApplicationError,
} = applicationSlice.actions;

export default applicationSlice.reducer;
