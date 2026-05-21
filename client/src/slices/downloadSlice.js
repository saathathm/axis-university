import { createSlice } from "@reduxjs/toolkit";

const downloadSlice = createSlice({
  name: "download",
  initialState: {
    downloads: [],
    loading: false,
    error: null,
    isLoaded: false,
  },
  reducers: {
    getDownloadsRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    getDownloadsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isLoaded: true,
        downloads: action.payload,
      };
    },

    getDownloadsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  getDownloadsRequest,
  getDownloadsSuccess,
  getDownloadsFail,
} = downloadSlice.actions;

export default downloadSlice.reducer;
