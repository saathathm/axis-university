import axiosInstance from "../../services/axiosInstance.js";

import {
  getEnrollmentsRequest,
  getEnrollmentsSuccess,
  getEnrollmentsFailure,
  getEnrollmentDetailsRequest,
  getEnrollmentDetailsSuccess,
  getEnrollmentDetailsFailure,
  createEnrollmentRequest,
  createEnrollmentSuccess,
  createEnrollmentFailure,
  updateEnrollmentRequest,
  updateEnrollmentSuccess,
  updateEnrollmentFailure,
  deleteEnrollmentRequest,
  deleteEnrollmentSuccess,
  deleteEnrollmentFailure,
} from "./enrollmentSlice.js";

export const getEnrollments = () => async (dispatch) => {
  try {
    dispatch(getEnrollmentsRequest());

    const { data } = await axiosInstance.get("/api/enrollments");

    dispatch(getEnrollmentsSuccess(data.data.data || data.data));
  } catch (error) {
    dispatch(
      getEnrollmentsFailure(
        error.response?.data?.message ||
          "Failed to fetch enrollments",
      ),
    );
  }
};

export const getEnrollmentDetails =
  (enrollmentId) => async (dispatch) => {
    try {
      dispatch(getEnrollmentDetailsRequest());

      const { data } = await axiosInstance.get(
        `/api/enrollments/${enrollmentId}`,
      );

      dispatch(getEnrollmentDetailsSuccess(data.data));
    } catch (error) {
      dispatch(
        getEnrollmentDetailsFailure(
          error.response?.data?.message ||
            "Failed to fetch enrollment details",
        ),
      );
    }
  };

export const createEnrollment =
  (enrollmentData) => async (dispatch) => {
    try {
      dispatch(createEnrollmentRequest());

      const { data } = await axiosInstance.post(
        "/api/enrollments",
        enrollmentData,
      );

      dispatch(createEnrollmentSuccess(data.message));
    } catch (error) {
      dispatch(
        createEnrollmentFailure(
          error.response?.data?.message ||
            "Failed to create enrollment",
        ),
      );
    }
  };

export const updateEnrollment =
  (enrollmentId, enrollmentData) => async (dispatch) => {
    try {
      dispatch(updateEnrollmentRequest());

      const { data } = await axiosInstance.patch(
        `/api/enrollments/${enrollmentId}`,
        enrollmentData,
      );

      dispatch(updateEnrollmentSuccess(data.message));
    } catch (error) {
      dispatch(
        updateEnrollmentFailure(
          error.response?.data?.message ||
            "Failed to update enrollment",
        ),
      );
    }
  };

export const deleteEnrollment =
  (enrollmentId) => async (dispatch) => {
    try {
      dispatch(deleteEnrollmentRequest());

      const { data } = await axiosInstance.delete(
        `/api/enrollments/${enrollmentId}`,
      );

      dispatch(deleteEnrollmentSuccess(data.message));
    } catch (error) {
      dispatch(
        deleteEnrollmentFailure(
          error.response?.data?.message ||
            "Failed to delete enrollment",
        ),
      );
    }
  };