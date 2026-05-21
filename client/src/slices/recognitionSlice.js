import { createSlice } from "@reduxjs/toolkit";

const recognitionSlice = createSlice({
  name: "recognition",
  initialState: {
    recognitions: [],
    loading: false,
    error: null,
    isLoaded: false,
  },
  reducers: {
    getRecognitionsRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    getRecognitionsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isLoaded: true,
        recognitions: action.payload,
      };
    },

    getRecognitionsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  getRecognitionsRequest,
  getRecognitionsSuccess,
  getRecognitionsFail,
} = recognitionSlice.actions;

export default recognitionSlice.reducer;
