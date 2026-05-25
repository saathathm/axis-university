import { createSlice } from "@reduxjs/toolkit";

const facultySlice = createSlice({
  name: "faculty",

  initialState: {
    loading: false,
    faculties: [],
    faculty: null,
  },

  reducers: {
    getFacultiesRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getFacultiesSuccess(state, actions) {
      return {
        ...state,
        faculties: actions.payload,
        loading: false,
      };
    },

    getFacultiesFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getFacultyDetailsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getFacultyDetailsSuccess(state, actions) {
      return {
        ...state,
        faculty: actions.payload,
        loading: false,
      };
    },

    getFacultyDetailsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    createFacultyRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    createFacultySuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    createFacultyFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    updateFacultyRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    updateFacultySuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    updateFacultyFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    deleteFacultyRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    deleteFacultySuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    deleteFacultyFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    clearFacultyDetails(state, actions) {
      return {
        ...state,
        faculty: null,
      };
    },

    clearFacultyMessage(state, actions) {
      return {
        ...state,
        message: null,
      };
    },

    clearFacultyError(state, actions) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  getFacultiesRequest,
  getFacultiesSuccess,
  getFacultiesFailure,
  getFacultyDetailsRequest,
  getFacultyDetailsSuccess,
  getFacultyDetailsFailure,
  createFacultyRequest,
  createFacultySuccess,
  createFacultyFailure,
  updateFacultyRequest,
  updateFacultySuccess,
  updateFacultyFailure,
  deleteFacultyRequest,
  deleteFacultySuccess,
  deleteFacultyFailure,
  clearFacultyDetails,
  clearFacultyMessage,
  clearFacultyError,
} = facultySlice.actions;

export default facultySlice.reducer;
