import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    loading: false,
    students: [],
    student: null,
  },
  reducers: {
    getStudentsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getStudentsSuccess(state, actions) {
      return {
        ...state,
        students: actions.payload,
        loading: false,
      };
    },

    getStudentsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getStudentDetailsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getStudentDetailsSuccess(state, actions) {
      return {
        ...state,
        student: actions.payload,
        loading: false,
      };
    },

    getStudentDetailsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    createStudentRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    createStudentSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    createStudentFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    updateStudentRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    updateStudentSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    updateStudentFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    deleteStudentRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    deleteStudentSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    deleteStudentFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    clearStudentDetails(state, actions) {
      return {
        ...state,
        student: null,
      };
    },

    clearStudentMessage(state, actions) {
      return {
        ...state,
        message: null,
      };
    },

    clearStudentError(state, actions) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  getStudentsRequest,
  getStudentsSuccess,
  getStudentsFailure,
  getStudentDetailsRequest,
  getStudentDetailsSuccess,
  getStudentDetailsFailure,
  createStudentRequest,
  createStudentSuccess,
  createStudentFailure,
  updateStudentRequest,
  updateStudentSuccess,
  updateStudentFailure,
  deleteStudentRequest,
  deleteStudentSuccess,
  deleteStudentFailure,
  clearStudentDetails,
  clearStudentMessage,
  clearStudentError,
} = studentSlice.actions;

export default studentSlice.reducer;
