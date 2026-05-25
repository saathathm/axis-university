import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
  name: "course",

  initialState: {
    loading: false,
    courses: [],
    course: null,
  },

  reducers: {
    getCoursesRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getCoursesSuccess(state, actions) {
      return {
        ...state,
        courses: actions.payload,
        loading: false,
      };
    },

    getCoursesFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getCourseDetailsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getCourseDetailsSuccess(state, actions) {
      return {
        ...state,
        course: actions.payload,
        loading: false,
      };
    },

    getCourseDetailsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    createCourseRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    createCourseSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    createCourseFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    updateCourseRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    updateCourseSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    updateCourseFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    deleteCourseRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    deleteCourseSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    deleteCourseFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    clearCourseDetails(state, actions) {
      return {
        ...state,
        course: null,
      };
    },

    clearCourseMessage(state, actions) {
      return {
        ...state,
        message: null,
      };
    },

    clearCourseError(state, actions) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  getCoursesRequest,
  getCoursesSuccess,
  getCoursesFailure,
  getCourseDetailsRequest,
  getCourseDetailsSuccess,
  getCourseDetailsFailure,
  createCourseRequest,
  createCourseSuccess,
  createCourseFailure,
  updateCourseRequest,
  updateCourseSuccess,
  updateCourseFailure,
  deleteCourseRequest,
  deleteCourseSuccess,
  deleteCourseFailure,
  clearCourseDetails,
  clearCourseMessage,
  clearCourseError,
} = courseSlice.actions;

export default courseSlice.reducer;