import { createSlice } from "@reduxjs/toolkit";

const courseCurriculumSlice = createSlice({
  name: "courseCurriculum",

  initialState: {
    loading: false,
    curriculums: [],
    courseCurriculum: null,
  },

  reducers: {
    getCourseCurriculumsRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },

    getCourseCurriculumsSuccess(state, actions) {
      return {
        ...state,
        curriculums: actions.payload,
        loading: false,
      };
    },

    getCourseCurriculumsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getCourseCurriculumDetailsRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },

    getCourseCurriculumDetailsSuccess(state, actions) {
      return {
        ...state,
        courseCurriculum: actions.payload,
        loading: false,
      };
    },

    getCourseCurriculumDetailsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    createCourseCurriculumRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },

    createCourseCurriculumSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    createCourseCurriculumFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    updateCourseCurriculumRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },

    updateCourseCurriculumSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    updateCourseCurriculumFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    deleteCourseCurriculumRequest(state) {
      return {
        ...state,
        loading: true,
      };
    },

    deleteCourseCurriculumSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    deleteCourseCurriculumFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    clearCourseCurriculumDetails(state) {
      return {
        ...state,
        courseCurriculum: null,
      };
    },

    clearCourseCurriculumMessage(state) {
      return {
        ...state,
        message: null,
      };
    },

    clearCourseCurriculumError(state) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  getCourseCurriculumsRequest,
  getCourseCurriculumsSuccess,
  getCourseCurriculumsFailure,
  getCourseCurriculumDetailsRequest,
  getCourseCurriculumDetailsSuccess,
  getCourseCurriculumDetailsFailure,
  createCourseCurriculumRequest,
  createCourseCurriculumSuccess,
  createCourseCurriculumFailure,
  updateCourseCurriculumRequest,
  updateCourseCurriculumSuccess,
  updateCourseCurriculumFailure,
  deleteCourseCurriculumRequest,
  deleteCourseCurriculumSuccess,
  deleteCourseCurriculumFailure,
  clearCourseCurriculumDetails,
  clearCourseCurriculumMessage,
  clearCourseCurriculumError,
} = courseCurriculumSlice.actions;

export default courseCurriculumSlice.reducer;
