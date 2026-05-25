import { createSlice } from "@reduxjs/toolkit";

const recognitionSlice = createSlice({
  name: "recognition",

  initialState: {
    loading: false,
    recognitions: [],
    recognition: null,
  },

  reducers: {
    getRecognitionsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getRecognitionsSuccess(state, actions) {
      return {
        ...state,
        recognitions: actions.payload,
        loading: false,
      };
    },

    getRecognitionsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getRecognitionDetailsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getRecognitionDetailsSuccess(state, actions) {
      return {
        ...state,
        recognition: actions.payload,
        loading: false,
      };
    },

    getRecognitionDetailsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    createRecognitionRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    createRecognitionSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    createRecognitionFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    updateRecognitionRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    updateRecognitionSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    updateRecognitionFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    deleteRecognitionRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    deleteRecognitionSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    deleteRecognitionFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    clearRecognitionDetails(state, actions) {
      return {
        ...state,
        recognition: null,
      };
    },

    clearRecognitionMessage(state, actions) {
      return {
        ...state,
        message: null,
      };
    },

    clearRecognitionError(state, actions) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  getRecognitionsRequest,
  getRecognitionsSuccess,
  getRecognitionsFailure,
  getRecognitionDetailsRequest,
  getRecognitionDetailsSuccess,
  getRecognitionDetailsFailure,
  createRecognitionRequest,
  createRecognitionSuccess,
  createRecognitionFailure,
  updateRecognitionRequest,
  updateRecognitionSuccess,
  updateRecognitionFailure,
  deleteRecognitionRequest,
  deleteRecognitionSuccess,
  deleteRecognitionFailure,
  clearRecognitionDetails,
  clearRecognitionMessage,
  clearRecognitionError,
} = recognitionSlice.actions;

export default recognitionSlice.reducer;
