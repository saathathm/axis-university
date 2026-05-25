import { createSlice } from "@reduxjs/toolkit";

const newsletterSlice = createSlice({
  name: "newsletter",
  initialState: {
    loading: false,
    subscriptions: [],
    subscription: null,
  },
  reducers: {
    createNewsletterSubscriptionRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    createNewsletterSubscriptionSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    createNewsletterSubscriptionFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getNewsletterSubscriptionsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getNewsletterSubscriptionsSuccess(state, actions) {
      return {
        ...state,
        subscriptions: actions.payload,
        loading: false,
      };
    },

    getNewsletterSubscriptionsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getNewsletterSubscriptionDetailsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getNewsletterSubscriptionDetailsSuccess(state, actions) {
      return {
        ...state,
        subscription: actions.payload,
        loading: false,
      };
    },

    getNewsletterSubscriptionDetailsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    updateNewsletterSubscriptionRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    updateNewsletterSubscriptionSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    updateNewsletterSubscriptionFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    deleteNewsletterSubscriptionRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    deleteNewsletterSubscriptionSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    deleteNewsletterSubscriptionFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    clearNewsletterMessage(state, actions) {
      return {
        ...state,
        message: null,
      };
    },

    clearNewsletterError(state, actions) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  createNewsletterSubscriptionRequest,
  createNewsletterSubscriptionSuccess,
  createNewsletterSubscriptionFailure,
  getNewsletterSubscriptionsRequest,
  getNewsletterSubscriptionsSuccess,
  getNewsletterSubscriptionsFailure,
  getNewsletterSubscriptionDetailsRequest,
  getNewsletterSubscriptionDetailsSuccess,
  getNewsletterSubscriptionDetailsFailure,
  updateNewsletterSubscriptionRequest,
  updateNewsletterSubscriptionSuccess,
  updateNewsletterSubscriptionFailure,
  deleteNewsletterSubscriptionRequest,
  deleteNewsletterSubscriptionSuccess,
  deleteNewsletterSubscriptionFailure,
  clearNewsletterMessage,
  clearNewsletterError,
} = newsletterSlice.actions;

export default newsletterSlice.reducer;
