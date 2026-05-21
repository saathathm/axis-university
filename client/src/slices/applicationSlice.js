import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    status: "idle",
    error: null,
    submitResult: null,
    verificationResult: null,
    adminApplications: [],
    adminApplicationsStatus: "idle",
  },
  reducers: {
    submitApplicationRequest(state, action) {
      return {
        ...state,
        status: "submitting",
        error: null,
      };
    },

    submitApplicationSuccess(state, action) {
      return {
        ...state,
        status: "submitted",
        submitResult: action.payload,
      };
    },

    submitApplicationFail(state, action) {
      return {
        ...state,
        status: "failed",
        error: action.payload,
      };
    },

    verifyCertificateRequest(state, action) {
      return {
        ...state,
        status: "verifying",
        error: null,
      };
    },

    verifyCertificateSuccess(state, action) {
      return {
        ...state,
        status: "verified",
        verificationResult: action.payload,
      };
    },

    verifyCertificateFail(state, action) {
      return {
        ...state,
        status: "failed",
        error: action.payload,
      };
    },

    getApplicationsRequest(state, action) {
      return {
        ...state,
        adminApplicationsStatus: "loading",
        error: null,
      };
    },

    getApplicationsSuccess(state, action) {
      return {
        ...state,
        adminApplicationsStatus: "succeeded",
        adminApplications: action.payload,
      };
    },

    getApplicationsFail(state, action) {
      return {
        ...state,
        adminApplicationsStatus: "failed",
        error: action.payload,
      };
    },

    approveApplicationSuccess(state, action) {
      return {
        ...state,
        adminApplications: state.adminApplications.map((item) =>
          String(item.id) === String(action.payload.application.id)
            ? action.payload.application
            : item
        ),
      };
    },

    rejectApplicationSuccess(state, action) {
      return {
        ...state,
        adminApplications: state.adminApplications.map((item) =>
          String(item.id) === String(action.payload.id) ? action.payload : item
        ),
      };
    },

    clearApplicationState(state, action) {
      return {
        ...state,
        status: "idle",
        error: null,
        submitResult: null,
        verificationResult: null,
      };
    },
  },
});

export const {
  submitApplicationRequest,
  submitApplicationSuccess,
  submitApplicationFail,
  verifyCertificateRequest,
  verifyCertificateSuccess,
  verifyCertificateFail,
  getApplicationsRequest,
  getApplicationsSuccess,
  getApplicationsFail,
  approveApplicationSuccess,
  rejectApplicationSuccess,
  clearApplicationState,
} = applicationSlice.actions;

export default applicationSlice.reducer;
