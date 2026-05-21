import axiosInstance from "../utils/axiosInstance";
import { getError } from "./contentHelper";
import {
  approveApplicationSuccess,
  getApplicationsFail,
  getApplicationsRequest,
  getApplicationsSuccess,
  rejectApplicationSuccess,
  submitApplicationFail,
  submitApplicationRequest,
  submitApplicationSuccess,
  verifyCertificateFail,
  verifyCertificateRequest,
  verifyCertificateSuccess,
} from "../slices/applicationSlice";

const createApplicationFormData = (payload) => {
  const formData = new FormData();

  Object.entries(payload).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    if (key === "attachments" && Array.isArray(value)) {
      value.forEach((file) => formData.append("attachments[]", file));
      return;
    }

    formData.append(key, value);
  });

  return formData;
};

export const submitApplication = (payload) => async (dispatch) => {
  try {
    dispatch(submitApplicationRequest());

    const { data } = await axiosInstance.post(
      "/applications",
      createApplicationFormData(payload),
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    dispatch(submitApplicationSuccess(data.data));
    return data.data;
  } catch (error) {
    const message = getError(error, "Failed to submit application.");
    dispatch(submitApplicationFail(message));
    throw message;
  }
};

export const verifyCertificate = (payload) => async (dispatch) => {
  try {
    dispatch(verifyCertificateRequest());
    const { data } = await axiosInstance.get("/certificates/verify", {
      params: payload,
    });
    dispatch(verifyCertificateSuccess(data));
    return data;
  } catch (error) {
    if (error.response?.data?.status === "not_found") {
      dispatch(verifyCertificateSuccess(error.response.data));
      return error.response.data;
    }

    const message = getError(error, "Unable to verify certificate.");
    dispatch(verifyCertificateFail(message));
    throw message;
  }
};

export const fetchAdminApplications = () => async (dispatch) => {
  try {
    dispatch(getApplicationsRequest());
    const { data } = await axiosInstance.get("/admin/applications");
    dispatch(getApplicationsSuccess(data.data.data ?? data.data ?? []));
  } catch (error) {
    dispatch(getApplicationsFail(getError(error, "Failed to load applications.")));
  }
};

export const approveAdminApplication = (applicationId) => async (dispatch) => {
  try {
    const { data } = await axiosInstance.post(
      `/admin/applications/${applicationId}/approve`
    );
    dispatch(approveApplicationSuccess(data.data));
    return data.data;
  } catch (error) {
    throw getError(error, "Failed to approve application.");
  }
};

export const rejectAdminApplication =
  ({ applicationId, admin_note }) =>
  async (dispatch) => {
    try {
      const { data } = await axiosInstance.post(
        `/admin/applications/${applicationId}/reject`,
        { admin_note }
      );
      dispatch(rejectApplicationSuccess(data.data));
      return data.data;
    } catch (error) {
      throw getError(error, "Failed to reject application.");
    }
  };
