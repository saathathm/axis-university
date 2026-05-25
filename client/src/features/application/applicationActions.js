import {
  createApplicationRequest,
  createApplicationSuccess,
  createApplicationFailure,
  getApplicationsRequest,
  getApplicationsSuccess,
  getApplicationsFailure,
  getApplicationDetailsRequest,
  getApplicationDetailsSuccess,
  getApplicationDetailsFailure,
  approveApplicationRequest,
  approveApplicationSuccess,
  approveApplicationFailure,
  rejectApplicationRequest,
  rejectApplicationSuccess,
  rejectApplicationFailure,
} from "./applicationSlice.js";

import axiosInstance from "../../services/axiosInstance.js";

export const createApplication = (applicationData) => async (dispatch) => {
  try {
    dispatch(createApplicationRequest());

    const { data } = await axiosInstance.post(
      "/api/applications",
      applicationData,
    );

    dispatch(createApplicationSuccess(data.message));
  } catch (error) {
    dispatch(
      createApplicationFailure(
        error.response?.data?.message || "Failed to submit application",
      ),
    );
  }
};

export const getApplications = () => async (dispatch) => {
  try {
    dispatch(getApplicationsRequest());

    const { data } = await axiosInstance.get("/api/applications");

    dispatch(getApplicationsSuccess(data.data.data));
  } catch (error) {
    dispatch(
      getApplicationsFailure(
        error.response?.data?.message || "Failed to fetch applications",
      ),
    );
  }
};

export const getApplicationDetails = (applicationId) => async (dispatch) => {
  try {
    dispatch(getApplicationDetailsRequest());

    const { data } = await axiosInstance.get(
      `/api/applications/${applicationId}`,
    );

    dispatch(getApplicationDetailsSuccess(data.data));
  } catch (error) {
    dispatch(
      getApplicationDetailsFailure(
        error.response?.data?.message || "Failed to fetch application details",
      ),
    );
  }
};

export const approveApplication = (applicationId) => async (dispatch) => {
  try {
    dispatch(approveApplicationRequest());

    const { data } = await axiosInstance.patch(
      `/api/applications/${applicationId}/approve`,
    );

    dispatch(approveApplicationSuccess(data.message));
  } catch (error) {
    dispatch(
      approveApplicationFailure(
        error.response?.data?.message || "Failed to approve application",
      ),
    );
  }
};

export const rejectApplication =
  (applicationId, adminNote = "") =>
  async (dispatch) => {
    try {
      dispatch(rejectApplicationRequest());

      const { data } = await axiosInstance.patch(
        `/api/applications/${applicationId}/reject`,
        {
          adminNote,
        },
      );

      dispatch(rejectApplicationSuccess(data.message));
    } catch (error) {
      dispatch(
        rejectApplicationFailure(
          error.response?.data?.message || "Failed to reject application",
        ),
      );
    }
  };
