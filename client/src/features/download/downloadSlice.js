import { createSlice } from "@reduxjs/toolkit";

const downloadSlice = createSlice({
  name: "download",
  initialState: {
    loading: false,
    downloads: [],
    download: null,
    downloadEditData: null,
  },
  reducers: {
    getDownloadsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getDownloadsSuccess(state, actions) {
      return {
        ...state,
        downloads: actions.payload,
        loading: false,
      };
    },

    getDownloadsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getDownloadDetailsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getDownloadDetailsSuccess(state, actions) {
      return {
        ...state,
        download: actions.payload,
        loading: false,
      };
    },

    getDownloadDetailsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getDownloadEditDataRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getDownloadEditDataSuccess(state, actions) {
      return {
        ...state,
        downloadEditData: actions.payload,
        loading: false,
      };
    },

    getDownloadEditDataFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    createDownloadRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    createDownloadSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    createDownloadFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    updateDownloadRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    updateDownloadSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    updateDownloadFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    deleteDownloadRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    deleteDownloadSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    deleteDownloadFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    clearDownloadDetails(state, actions) {
      return {
        ...state,
        download: null,
      };
    },

    clearDownloadEditData(state, actions) {
      return {
        ...state,
        downloadEditData: null,
      };
    },

    clearDownloadMessage(state, actions) {
      return {
        ...state,
        message: null,
      };
    },

    clearDownloadError(state, actions) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  getDownloadsRequest,
  getDownloadsSuccess,
  getDownloadsFailure,
  getDownloadDetailsRequest,
  getDownloadDetailsSuccess,
  getDownloadDetailsFailure,
  getDownloadEditDataRequest,
  getDownloadEditDataSuccess,
  getDownloadEditDataFailure,
  createDownloadRequest,
  createDownloadSuccess,
  createDownloadFailure,
  updateDownloadRequest,
  updateDownloadSuccess,
  updateDownloadFailure,
  deleteDownloadRequest,
  deleteDownloadSuccess,
  deleteDownloadFailure,
  clearDownloadDetails,
  clearDownloadEditData,
  clearDownloadMessage,
  clearDownloadError,
} = downloadSlice.actions;

export default downloadSlice.reducer;
