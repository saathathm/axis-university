import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: "message",
  initialState: {
    loading: false,
    messages: [],
    messageDetails: null,
  },
  reducers: {
    createMessageRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    createMessageSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    createMessageFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getMessagesRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getMessagesSuccess(state, actions) {
      return {
        ...state,
        messages: actions.payload,
        loading: false,
      };
    },

    getMessagesFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getMessageDetailsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getMessageDetailsSuccess(state, actions) {
      return {
        ...state,
        messageDetails: actions.payload,
        loading: false,
      };
    },

    getMessageDetailsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    updateMessageRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    updateMessageSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    updateMessageFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    deleteMessageRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    deleteMessageSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    deleteMessageFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    clearMessageDetails(state, actions) {
      return {
        ...state,
        messageDetails: null,
      };
    },

    clearMessageSuccess(state, actions) {
      return {
        ...state,
        message: null,
      };
    },

    clearMessageError(state, actions) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  createMessageRequest,
  createMessageSuccess,
  createMessageFailure,
  getMessagesRequest,
  getMessagesSuccess,
  getMessagesFailure,
  getMessageDetailsRequest,
  getMessageDetailsSuccess,
  getMessageDetailsFailure,
  updateMessageRequest,
  updateMessageSuccess,
  updateMessageFailure,
  deleteMessageRequest,
  deleteMessageSuccess,
  deleteMessageFailure,
  clearMessageDetails,
  clearMessageSuccess,
  clearMessageError,
} = messageSlice.actions;

export default messageSlice.reducer;
