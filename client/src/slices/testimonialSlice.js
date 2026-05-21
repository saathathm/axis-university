import { createSlice } from "@reduxjs/toolkit";

const testimonialSlice = createSlice({
  name: "testimonial",
  initialState: {
    testimonials: [],
    loading: false,
    error: null,
    isLoaded: false,
  },
  reducers: {
    getTestimonialsRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    getTestimonialsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isLoaded: true,
        testimonials: action.payload,
      };
    },

    getTestimonialsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  getTestimonialsRequest,
  getTestimonialsSuccess,
  getTestimonialsFail,
} = testimonialSlice.actions;

export default testimonialSlice.reducer;
