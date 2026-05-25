import { createSlice } from "@reduxjs/toolkit";

const testimonialSlice = createSlice({
  name: "testimonial",

  initialState: {
    loading: false,
    testimonials: [],
    testimonial: null,
  },

  reducers: {
    getTestimonialsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getTestimonialsSuccess(state, actions) {
      return {
        ...state,
        testimonials: actions.payload,
        loading: false,
      };
    },

    getTestimonialsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    getTestimonialDetailsRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    getTestimonialDetailsSuccess(state, actions) {
      return {
        ...state,
        testimonial: actions.payload,
        loading: false,
      };
    },

    getTestimonialDetailsFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    createTestimonialRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    createTestimonialSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    createTestimonialFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    updateTestimonialRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    updateTestimonialSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    updateTestimonialFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    deleteTestimonialRequest(state, actions) {
      return {
        ...state,
        loading: true,
      };
    },

    deleteTestimonialSuccess(state, actions) {
      return {
        ...state,
        message: actions.payload,
        loading: false,
      };
    },

    deleteTestimonialFailure(state, actions) {
      return {
        ...state,
        error: actions.payload,
        loading: false,
      };
    },

    clearTestimonialDetails(state, actions) {
      return {
        ...state,
        testimonial: null,
      };
    },

    clearTestimonialMessage(state, actions) {
      return {
        ...state,
        message: null,
      };
    },

    clearTestimonialError(state, actions) {
      return {
        ...state,
        error: null,
      };
    },
  },
});

export const {
  getTestimonialsRequest,
  getTestimonialsSuccess,
  getTestimonialsFailure,
  getTestimonialDetailsRequest,
  getTestimonialDetailsSuccess,
  getTestimonialDetailsFailure,
  createTestimonialRequest,
  createTestimonialSuccess,
  createTestimonialFailure,
  updateTestimonialRequest,
  updateTestimonialSuccess,
  updateTestimonialFailure,
  deleteTestimonialRequest,
  deleteTestimonialSuccess,
  deleteTestimonialFailure,
  clearTestimonialDetails,
  clearTestimonialMessage,
  clearTestimonialError,
} = testimonialSlice.actions;

export default testimonialSlice.reducer;
