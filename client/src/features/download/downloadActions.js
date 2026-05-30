import {
  getDownloadsRequest,
  getDownloadsSuccess,
  getDownloadsFailure,
  getDownloadDetailsRequest,
  getDownloadDetailsSuccess,
  getDownloadDetailsFailure,
  getDownloadEditDataRequest,
  getDownloadEditDataSuccess,
  getDownloadEditDataFailure,
  createDownloadRequest,
  createDownloadSuccess,
  createDownloadFailure,
  updateDownloadRequest,
  updateDownloadSuccess,
  updateDownloadFailure,
  deleteDownloadRequest,
  deleteDownloadSuccess,
  deleteDownloadFailure,
} from "./downloadSlice.js";

import axiosInstance from "../../services/axiosInstance.js";

export const getDownloads = () => async (dispatch) => {
  try {
    dispatch(getDownloadsRequest());

    const { data } = await axiosInstance.get("/api/downloads");

    dispatch(getDownloadsSuccess(data.data.data || data.data));
  } catch (error) {
    dispatch(
      getDownloadsFailure(
        error.response?.data?.message || "Failed to fetch downloads",
      ),
    );
  }
};

export const getDownloadDetails = (downloadId) => async (dispatch) => {
  try {
    dispatch(getDownloadDetailsRequest());

    const { data } = await axiosInstance.get(`/api/downloads/${downloadId}`);

    dispatch(getDownloadDetailsSuccess(data.data));
  } catch (error) {
    dispatch(
      getDownloadDetailsFailure(
        error.response?.data?.message || "Failed to fetch download details",
      ),
    );
  }
};

export const getDownloadEditData = (downloadId) => async (dispatch) => {
  try {
    dispatch(getDownloadEditDataRequest());

    const { data } = await axiosInstance.get(
      `/api/downloads/${downloadId}/edit-data`,
    );

    dispatch(getDownloadEditDataSuccess(data.data));
  } catch (error) {
    dispatch(
      getDownloadEditDataFailure(
        error.response?.data?.message || "Failed to fetch download edit data",
      ),
    );
  }
};

export const createDownload = (downloadData) => async (dispatch) => {
  try {
    dispatch(createDownloadRequest());

    const { data } = await axiosInstance.post("/api/downloads", downloadData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(createDownloadSuccess(data.message));
  } catch (error) {
    dispatch(
      createDownloadFailure(
        error.response?.data?.message || "Failed to create download",
      ),
    );
  }
};

export const updateDownload =
  (downloadId, downloadData) => async (dispatch) => {
    try {
      dispatch(updateDownloadRequest());

      const { data } = await axiosInstance.post(
        `/api/downloads/${downloadId}?_method=PUT`,
        downloadData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      dispatch(updateDownloadSuccess(data.message));
    } catch (error) {
      dispatch(
        updateDownloadFailure(
          error.response?.data?.message || "Failed to update download",
        ),
      );
    }
  };

export const deleteDownload = (downloadId) => async (dispatch) => {
  try {
    dispatch(deleteDownloadRequest());

    const { data } = await axiosInstance.delete(`/api/downloads/${downloadId}`);

    dispatch(deleteDownloadSuccess(data.message));
  } catch (error) {
    dispatch(
      deleteDownloadFailure(
        error.response?.data?.message || "Failed to delete download",
      ),
    );
  }
};
