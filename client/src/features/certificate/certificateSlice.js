import { createSlice } from "@reduxjs/toolkit";

const certificateSlice = createSlice({
  name: "certificate",
  initialState: {
    loading: false,
    certificates: [],
    certificate: null,
    verifiedCertificate: null,
  },
  reducers: {
    getCertificatesRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getCertificatesSuccess(state, actions) {
      return {
        ...state,
        certificates: actions.payload,
        loading: false,
      };
    },

    getCertificatesFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getCertificateDetailsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getCertificateDetailsSuccess(state, actions) {
      return {
        ...state,
        certificate: actions.payload,
        loading: false,
      };
    },

    getCertificateDetailsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    createCertificateRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    createCertificateSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    createCertificateFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    updateCertificateRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    updateCertificateSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    updateCertificateFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    deleteCertificateRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    deleteCertificateSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    deleteCertificateFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    verifyCertificateRequest(state, actions) {
      return {
        ...state,
        loading: true,
        verifiedCertificate: null,
      };
    },

    verifyCertificateSuccess(state, actions) {
      return {
        ...state,
        verifiedCertificate: actions.payload,
        loading: false,
      };
    },

    verifyCertificateFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        verifiedCertificate: null,
        loading: false,
      };
    },

    clearCertificateDetails(state, actions) {
      return {
        ...state,
        certificate: null,
      };
    },

    clearVerifiedCertificate(state, actions) {
      return {
        ...state,
        verifiedCertificate: null,
      };
    },

    clearCertificateMessage(state, actions) {
      return {
        ...state,
        message: null,
      };
    },

    clearCertificateError(state, actions) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  getCertificatesRequest,
  getCertificatesSuccess,
  getCertificatesFailure,
  getCertificateDetailsRequest,
  getCertificateDetailsSuccess,
  getCertificateDetailsFailure,
  createCertificateRequest,
  createCertificateSuccess,
  createCertificateFailure,
  updateCertificateRequest,
  updateCertificateSuccess,
  updateCertificateFailure,
  deleteCertificateRequest,
  deleteCertificateSuccess,
  deleteCertificateFailure,
  verifyCertificateRequest,
  verifyCertificateSuccess,
  verifyCertificateFailure,
  clearCertificateDetails,
  clearVerifiedCertificate,
  clearCertificateMessage,
  clearCertificateError,
} = certificateSlice.actions;

export default certificateSlice.reducer;
