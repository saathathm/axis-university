import axiosInstance from "../../services/axiosInstance.js";

import {
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
} from "./testimonialSlice.js";

export const getTestimonials = () => async (dispatch) => {
  try {
    dispatch(getTestimonialsRequest());

    const { data } = await axiosInstance.get("/api/testimonials");

    dispatch(getTestimonialsSuccess(data.data.data || data.data));
  } catch (error) {
    dispatch(
      getTestimonialsFailure(
        error.response?.data?.message ||
          "Failed to fetch testimonials",
      ),
    );
  }
};

export const getTestimonialDetails =
  (testimonialId) => async (dispatch) => {
    try {
      dispatch(getTestimonialDetailsRequest());

      const { data } = await axiosInstance.get(
        `/api/testimonials/${testimonialId}`,
      );

      dispatch(getTestimonialDetailsSuccess(data.data));
    } catch (error) {
      dispatch(
        getTestimonialDetailsFailure(
          error.response?.data?.message ||
            "Failed to fetch testimonial details",
        ),
      );
    }
  };

export const createTestimonial =
  (testimonialData) => async (dispatch) => {
    try {
      dispatch(createTestimonialRequest());

      const formData = new FormData();

      Object.keys(testimonialData).forEach((key) => {
        const value = testimonialData[key];

        if (value === undefined || value === null) {
          return;
        }

        formData.append(key, value);
      });

      const { data } = await axiosInstance.post(
        "/api/testimonials",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      dispatch(createTestimonialSuccess(data.message));
    } catch (error) {
      dispatch(
        createTestimonialFailure(
          error.response?.data?.message ||
            "Failed to create testimonial",
        ),
      );
    }
  };

export const updateTestimonial =
  (testimonialId, testimonialData) => async (dispatch) => {
    try {
      dispatch(updateTestimonialRequest());

      const formData = new FormData();

      Object.keys(testimonialData).forEach((key) => {
        const value = testimonialData[key];

        if (value === undefined || value === null) {
          return;
        }

        formData.append(key, value);
      });

      formData.append("_method", "PATCH");

      const { data } = await axiosInstance.post(
        `/api/testimonials/${testimonialId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      dispatch(updateTestimonialSuccess(data.message));
    } catch (error) {
      dispatch(
        updateTestimonialFailure(
          error.response?.data?.message ||
            "Failed to update testimonial",
        ),
      );
    }
  };

export const deleteTestimonial =
  (testimonialId) => async (dispatch) => {
    try {
      dispatch(deleteTestimonialRequest());

      const { data } = await axiosInstance.delete(
        `/api/testimonials/${testimonialId}`,
      );

      dispatch(deleteTestimonialSuccess(data.message));
    } catch (error) {
      dispatch(
        deleteTestimonialFailure(
          error.response?.data?.message ||
            "Failed to delete testimonial",
        ),
      );
    }
  };