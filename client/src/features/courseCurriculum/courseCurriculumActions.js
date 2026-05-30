import axiosInstance from "../../services/axiosInstance.js";

import {
  getCourseCurriculumsRequest,
  getCourseCurriculumsSuccess,
  getCourseCurriculumsFailure,
  getCourseCurriculumDetailsRequest,
  getCourseCurriculumDetailsSuccess,
  getCourseCurriculumDetailsFailure,
  createCourseCurriculumRequest,
  createCourseCurriculumSuccess,
  createCourseCurriculumFailure,
  updateCourseCurriculumRequest,
  updateCourseCurriculumSuccess,
  updateCourseCurriculumFailure,
  deleteCourseCurriculumRequest,
  deleteCourseCurriculumSuccess,
  deleteCourseCurriculumFailure,
} from "./courseCurriculumSlice.js";

export const getCourseCurriculums = (courseId) => async (dispatch) => {
  try {
    dispatch(getCourseCurriculumsRequest());

    const { data } = await axiosInstance.get(
      `/api/courses/${courseId}/curriculums`,
    );

    dispatch(getCourseCurriculumsSuccess(data.data || data));
  } catch (error) {
    dispatch(
      getCourseCurriculumsFailure(
        error.response?.data?.message || "Failed to fetch curriculums",
      ),
    );
  }
};

export const getCourseCurriculumDetails = (curriculumId) => async (dispatch) => {
  try {
    dispatch(getCourseCurriculumDetailsRequest());

    const { data } = await axiosInstance.get(
      `/api/course-curriculums/${curriculumId}`,
    );

    dispatch(getCourseCurriculumDetailsSuccess(data.data));
  } catch (error) {
    dispatch(
      getCourseCurriculumDetailsFailure(
        error.response?.data?.message ||
          "Failed to fetch curriculum details",
      ),
    );
  }
};

export const createCourseCurriculum =
  (courseId, curriculumData) => async (dispatch) => {
    try {
      dispatch(createCourseCurriculumRequest());

      const { data } = await axiosInstance.post(
        `/api/courses/${courseId}/curriculums`,
        curriculumData,
      );

      dispatch(createCourseCurriculumSuccess(data.message));
    } catch (error) {
      dispatch(
        createCourseCurriculumFailure(
          error.response?.data?.message || "Failed to create curriculum",
        ),
      );
    }
  };

export const updateCourseCurriculum =
  (curriculumId, curriculumData) => async (dispatch) => {
    try {
      dispatch(updateCourseCurriculumRequest());

      const { data } = await axiosInstance.patch(
        `/api/course-curriculums/${curriculumId}`,
        curriculumData,
      );

      dispatch(updateCourseCurriculumSuccess(data.message));
    } catch (error) {
      dispatch(
        updateCourseCurriculumFailure(
          error.response?.data?.message || "Failed to update curriculum",
        ),
      );
    }
  };

export const deleteCourseCurriculum = (curriculumId) => async (dispatch) => {
  try {
    dispatch(deleteCourseCurriculumRequest());

    const { data } = await axiosInstance.delete(
      `/api/course-curriculums/${curriculumId}`,
    );

    dispatch(deleteCourseCurriculumSuccess(data.message));
  } catch (error) {
    dispatch(
      deleteCourseCurriculumFailure(
        error.response?.data?.message || "Failed to delete curriculum",
      ),
    );
  }
};
