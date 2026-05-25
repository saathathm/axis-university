import axiosInstance from "../../services/axiosInstance.js";

import {
  getRecognitionsRequest,
  getRecognitionsSuccess,
  getRecognitionsFailure,
  getRecognitionDetailsRequest,
  getRecognitionDetailsSuccess,
  getRecognitionDetailsFailure,
  createRecognitionRequest,
  createRecognitionSuccess,
  createRecognitionFailure,
  updateRecognitionRequest,
  updateRecognitionSuccess,
  updateRecognitionFailure,
  deleteRecognitionRequest,
  deleteRecognitionSuccess,
  deleteRecognitionFailure,
} from "./recognitionSlice.js";

export const getRecognitions = () => async (dispatch) => {
  try {
    dispatch(getRecognitionsRequest());

    const { data } = await axiosInstance.get("/api/recognitions");

    dispatch(getRecognitionsSuccess(data.data.data || data.data));
  } catch (error) {
    dispatch(
      getRecognitionsFailure(
        error.response?.data?.message || "Failed to fetch recognitions",
      ),
    );
  }
};

export const getRecognitionDetails = (recognitionId) => async (dispatch) => {
  try {
    dispatch(getRecognitionDetailsRequest());

    const { data } = await axiosInstance.get(
      `/api/recognitions/${recognitionId}`,
    );

    dispatch(getRecognitionDetailsSuccess(data.data));
  } catch (error) {
    dispatch(
      getRecognitionDetailsFailure(
        error.response?.data?.message || "Failed to fetch recognition details",
      ),
    );
  }
};

export const createRecognition = (recognitionData) => async (dispatch) => {
  try {
    dispatch(createRecognitionRequest());

    const formData = new FormData();

    Object.keys(recognitionData).forEach((key) => {
      const value = recognitionData[key];

      if (value === undefined || value === null) {
        return;
      }

      formData.append(key, value);
    });

    const { data } = await axiosInstance.post("/api/recognitions", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(createRecognitionSuccess(data.message));
  } catch (error) {
    dispatch(
      createRecognitionFailure(
        error.response?.data?.message || "Failed to create recognition",
      ),
    );
  }
};

export const updateRecognition =
  (recognitionId, recognitionData) => async (dispatch) => {
    try {
      dispatch(updateRecognitionRequest());

      const formData = new FormData();

      Object.keys(recognitionData).forEach((key) => {
        const value = recognitionData[key];

        if (value === undefined || value === null) {
          return;
        }

        formData.append(key, value);
      });

      formData.append("_method", "PATCH");

      const { data } = await axiosInstance.post(
        `/api/recognitions/${recognitionId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      dispatch(updateRecognitionSuccess(data.message));
    } catch (error) {
      dispatch(
        updateRecognitionFailure(
          error.response?.data?.message || "Failed to update recognition",
        ),
      );
    }
  };

export const deleteRecognition = (recognitionId) => async (dispatch) => {
  try {
    dispatch(deleteRecognitionRequest());

    const { data } = await axiosInstance.delete(
      `/api/recognitions/${recognitionId}`,
    );

    dispatch(deleteRecognitionSuccess(data.message));
  } catch (error) {
    dispatch(
      deleteRecognitionFailure(
        error.response?.data?.message || "Failed to delete recognition",
      ),
    );
  }
};
