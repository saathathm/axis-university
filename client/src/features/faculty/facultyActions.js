import axiosInstance from "../../services/axiosInstance.js";

import {
  getFacultiesRequest,
  getFacultiesSuccess,
  getFacultiesFailure,
  getFacultyDetailsRequest,
  getFacultyDetailsSuccess,
  getFacultyDetailsFailure,
  createFacultyRequest,
  createFacultySuccess,
  createFacultyFailure,
  updateFacultyRequest,
  updateFacultySuccess,
  updateFacultyFailure,
  deleteFacultyRequest,
  deleteFacultySuccess,
  deleteFacultyFailure,
} from "./facultySlice.js";

export const getFaculties = () => async (dispatch) => {
  try {
    dispatch(getFacultiesRequest());

    const { data } = await axiosInstance.get("/api/faculties");

    dispatch(getFacultiesSuccess(data.data.data || data.data));
  } catch (error) {
    dispatch(
      getFacultiesFailure(
        error.response?.data?.message ||
          "Failed to fetch faculties",
      ),
    );
  }
};

export const getFacultyDetails = (facultyId) => async (dispatch) => {
  try {
    dispatch(getFacultyDetailsRequest());

    const { data } = await axiosInstance.get(
      `/api/faculties/${facultyId}`,
    );

    dispatch(getFacultyDetailsSuccess(data.data));
  } catch (error) {
    dispatch(
      getFacultyDetailsFailure(
        error.response?.data?.message ||
          "Failed to fetch faculty details",
      ),
    );
  }
};

export const createFaculty = (facultyData) => async (dispatch) => {
  try {
    dispatch(createFacultyRequest());

    const formData = new FormData();

    Object.keys(facultyData).forEach((key) => {
      const value = facultyData[key];

      if (value === undefined || value === null) {
        return;
      }

      formData.append(key, value);
    });

    const { data } = await axiosInstance.post(
      "/api/faculties",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );

    dispatch(createFacultySuccess(data.message));
  } catch (error) {
    dispatch(
      createFacultyFailure(
        error.response?.data?.message ||
          "Failed to create faculty",
      ),
    );
  }
};

export const updateFaculty =
  (facultyId, facultyData) => async (dispatch) => {
    try {
      dispatch(updateFacultyRequest());

      const formData = new FormData();

      Object.keys(facultyData).forEach((key) => {
        const value = facultyData[key];

        if (value === undefined || value === null) {
          return;
        }

        formData.append(key, value);
      });

      formData.append("_method", "PATCH");

      const { data } = await axiosInstance.post(
        `/api/faculties/${facultyId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      dispatch(updateFacultySuccess(data.message));
    } catch (error) {
      dispatch(
        updateFacultyFailure(
          error.response?.data?.message ||
            "Failed to update faculty",
        ),
      );
    }
  };

export const deleteFaculty = (facultyId) => async (dispatch) => {
  try {
    dispatch(deleteFacultyRequest());

    const { data } = await axiosInstance.delete(
      `/api/faculties/${facultyId}`,
    );

    dispatch(deleteFacultySuccess(data.message));
  } catch (error) {
    dispatch(
      deleteFacultyFailure(
        error.response?.data?.message ||
          "Failed to delete faculty",
      ),
    );
  }
};