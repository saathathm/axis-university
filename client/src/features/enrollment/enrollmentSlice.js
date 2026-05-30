import { createSlice } from "@reduxjs/toolkit";

const enrollmentSlice = createSlice({
  name: "enrollment",

  initialState: {
    loading: false,
    enrollments: [],
    enrollment: null,
    enrollmentEditData: null,
  },

  reducers: {
    getEnrollmentsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getEnrollmentsSuccess(state, actions) {
      return {
        ...state,
        enrollments: actions.payload,
        loading: false,
      };
    },

    getEnrollmentsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getEnrollmentDetailsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getEnrollmentDetailsSuccess(state, actions) {
      return {
        ...state,
        enrollment: actions.payload,
        loading: false,
      };
    },

    getEnrollmentDetailsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getEnrollmentEditDataRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getEnrollmentEditDataSuccess(state, actions) {
      return {
        ...state,
        enrollmentEditData: actions.payload,
        loading: false,
      };
    },

    getEnrollmentEditDataFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    createEnrollmentRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    createEnrollmentSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    createEnrollmentFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    updateEnrollmentRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    updateEnrollmentSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    updateEnrollmentFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    deleteEnrollmentRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    deleteEnrollmentSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    deleteEnrollmentFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    clearEnrollmentDetails(state, actions) {
      return {
        ...state,
        enrollment: null,
        enrollmentEditData: null,
      };
    },

    clearEnrollmentMessage(state, actions) {
      return {
        ...state,
        message: null,
      };
    },

    clearEnrollmentError(state, actions) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  getEnrollmentsRequest,
  getEnrollmentsSuccess,
  getEnrollmentsFailure,
  getEnrollmentDetailsRequest,
  getEnrollmentDetailsSuccess,
  getEnrollmentDetailsFailure,
  getEnrollmentEditDataRequest,
  getEnrollmentEditDataSuccess,
  getEnrollmentEditDataFailure,
  createEnrollmentRequest,
  createEnrollmentSuccess,
  createEnrollmentFailure,
  updateEnrollmentRequest,
  updateEnrollmentSuccess,
  updateEnrollmentFailure,
  deleteEnrollmentRequest,
  deleteEnrollmentSuccess,
  deleteEnrollmentFailure,
  clearEnrollmentDetails,
  clearEnrollmentMessage,
  clearEnrollmentError,
} = enrollmentSlice.actions;

export default enrollmentSlice.reducer;
