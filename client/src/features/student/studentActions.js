import {
  getStudentsRequest,
  getStudentsSuccess,
  getStudentsFailure,
  getStudentDetailsRequest,
  getStudentDetailsSuccess,
  getStudentDetailsFailure,
  createStudentRequest,
  createStudentSuccess,
  createStudentFailure,
  updateStudentRequest,
  updateStudentSuccess,
  updateStudentFailure,
  deleteStudentRequest,
  deleteStudentSuccess,
  deleteStudentFailure,
} from "./studentSlice.js";

import axiosInstance from "../../services/axiosInstance.js";

export const getStudents = () => async (dispatch) => {
  try {
    dispatch(getStudentsRequest());

    const { data } = await axiosInstance.get("/api/students");

    dispatch(getStudentsSuccess(data.data.data || data.data));
  } catch (error) {
    dispatch(
      getStudentsFailure(
        error.response?.data?.message || "Failed to fetch students",
      ),
    );
  }
};

export const getStudentDetails = (studentId) => async (dispatch) => {
  try {
    dispatch(getStudentDetailsRequest());

    const { data } = await axiosInstance.get(`/api/students/${studentId}`);

    dispatch(getStudentDetailsSuccess(data.data));
  } catch (error) {
    dispatch(
      getStudentDetailsFailure(
        error.response?.data?.message || "Failed to fetch student details",
      ),
    );
  }
};

export const createStudent = (studentData) => async (dispatch) => {
  try {
    dispatch(createStudentRequest());

    const { data } = await axiosInstance.post("/api/students", studentData);

    dispatch(createStudentSuccess(data.message));
  } catch (error) {
    dispatch(
      createStudentFailure(
        error.response?.data?.message || "Failed to create student",
      ),
    );
  }
};

export const updateStudent = (studentId, studentData) => async (dispatch) => {
  try {
    dispatch(updateStudentRequest());

    const { data } = await axiosInstance.patch(
      `/api/students/${studentId}`,
      studentData,
    );

    dispatch(updateStudentSuccess(data.message));
  } catch (error) {
    dispatch(
      updateStudentFailure(
        error.response?.data?.message || "Failed to update student",
      ),
    );
  }
};

export const deleteStudent = (studentId) => async (dispatch) => {
  try {
    dispatch(deleteStudentRequest());

    const { data } = await axiosInstance.delete(`/api/students/${studentId}`);

    dispatch(deleteStudentSuccess(data.message));
  } catch (error) {
    dispatch(
      deleteStudentFailure(
        error.response?.data?.message || "Failed to delete student",
      ),
    );
  }
};
