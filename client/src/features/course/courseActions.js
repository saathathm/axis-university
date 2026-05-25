import axiosInstance from "../../services/axiosInstance.js";

import {
  getCoursesRequest,
  getCoursesSuccess,
  getCoursesFailure,
  getCourseDetailsRequest,
  getCourseDetailsSuccess,
  getCourseDetailsFailure,
  createCourseRequest,
  createCourseSuccess,
  createCourseFailure,
  updateCourseRequest,
  updateCourseSuccess,
  updateCourseFailure,
  deleteCourseRequest,
  deleteCourseSuccess,
  deleteCourseFailure,
} from "./courseSlice.js";

export const getCourses =
  (search = "", facultyId = "") =>
  async (dispatch) => {
    try {
      dispatch(getCoursesRequest());

      const { data } = await axiosInstance.get("/api/courses", {
        params: {
          search: search || undefined,
          facultyId: facultyId || undefined,
        },
      });

      dispatch(getCoursesSuccess(data.data.data || data.data));
    } catch (error) {
      dispatch(
        getCoursesFailure(
          error.response?.data?.message || "Failed to fetch courses",
        ),
      );
    }
  };

export const getCourseDetails = (courseId) => async (dispatch) => {
  try {
    dispatch(getCourseDetailsRequest());

    const { data } = await axiosInstance.get(`/api/courses/${courseId}`);

    dispatch(getCourseDetailsSuccess(data.data));
  } catch (error) {
    dispatch(
      getCourseDetailsFailure(
        error.response?.data?.message ||
          "Failed to fetch course details",
      ),
    );
  }
};

export const createCourse = (courseData) => async (dispatch) => {
  try {
    dispatch(createCourseRequest());

    const formData = new FormData();

    Object.keys(courseData).forEach((key) => {
      const value = courseData[key];

      if (value === undefined || value === null) {
        return;
      }

      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          formData.append(`${key}[${index}]`, item);
        });
      } else {
        formData.append(key, value);
      }
    });

    const { data } = await axiosInstance.post("/api/courses", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(createCourseSuccess(data.message));
  } catch (error) {
    dispatch(
      createCourseFailure(
        error.response?.data?.message || "Failed to create course",
      ),
    );
  }
};

export const updateCourse =
  (courseId, courseData) => async (dispatch) => {
    try {
      dispatch(updateCourseRequest());

      const formData = new FormData();

      Object.keys(courseData).forEach((key) => {
        const value = courseData[key];

        if (value === undefined || value === null) {
          return;
        }

        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formData.append(`${key}[${index}]`, item);
          });
        } else {
          formData.append(key, value);
        }
      });

      formData.append("_method", "PATCH");

      const { data } = await axiosInstance.post(
        `/api/courses/${courseId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      dispatch(updateCourseSuccess(data.message));
    } catch (error) {
      dispatch(
        updateCourseFailure(
          error.response?.data?.message || "Failed to update course",
        ),
      );
    }
  };

export const deleteCourse = (courseId) => async (dispatch) => {
  try {
    dispatch(deleteCourseRequest());

    const { data } = await axiosInstance.delete(
      `/api/courses/${courseId}`,
    );

    dispatch(deleteCourseSuccess(data.message));
  } catch (error) {
    dispatch(
      deleteCourseFailure(
        error.response?.data?.message || "Failed to delete course",
      ),
    );
  }
};