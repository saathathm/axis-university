import axiosInstance from "../utils/axiosInstance";
import { getCollection, getError, normalizeTestimonial } from "./contentHelper";
import {
  getTestimonialsFail,
  getTestimonialsRequest,
  getTestimonialsSuccess,
} from "../slices/testimonialSlice";

export const fetchTestimonials = () => async (dispatch, getState) => {
  const { loading, isLoaded } = getState().testimonial;
  if (loading || isLoaded) return;

  try {
    dispatch(getTestimonialsRequest());
    const response = await axiosInstance.get("/testimonials");
    const testimonials = getCollection(response).map(normalizeTestimonial);
    dispatch(getTestimonialsSuccess(testimonials));
  } catch (error) {
    dispatch(getTestimonialsFail(getError(error, "Unable to load testimonials.")));
  }
};
