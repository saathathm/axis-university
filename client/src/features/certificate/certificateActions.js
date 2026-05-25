import {
  getCertificatesRequest,
  getCertificatesSuccess,
  getCertificatesFailure,
  getCertificateDetailsRequest,
  getCertificateDetailsSuccess,
  getCertificateDetailsFailure,
  createCertificateRequest,
  createCertificateSuccess,
  createCertificateFailure,
  updateCertificateRequest,
  updateCertificateSuccess,
  updateCertificateFailure,
  deleteCertificateRequest,
  deleteCertificateSuccess,
  deleteCertificateFailure,
  verifyCertificateRequest,
  verifyCertificateSuccess,
  verifyCertificateFailure,
} from "./certificateSlice.js";

import axiosInstance from "../../services/axiosInstance.js";

export const getCertificates = () => async (dispatch) => {
  try {
    dispatch(getCertificatesRequest());

    const { data } = await axiosInstance.get("/api/certificates");

    dispatch(getCertificatesSuccess(data.data.data || data.data));
  } catch (error) {
    dispatch(
      getCertificatesFailure(
        error.response?.data?.message || "Failed to fetch certificates",
      ),
    );
  }
};

export const getCertificateDetails = (certificateId) => async (dispatch) => {
  try {
    dispatch(getCertificateDetailsRequest());

    const { data } = await axiosInstance.get(`/api/certificates/${certificateId}`);

    dispatch(getCertificateDetailsSuccess(data.data));
  } catch (error) {
    dispatch(
      getCertificateDetailsFailure(
        error.response?.data?.message || "Failed to fetch certificate details",
      ),
    );
  }
};

export const createCertificate = (certificateData) => async (dispatch) => {
  try {
    dispatch(createCertificateRequest());

    const { data } = await axiosInstance.post("/api/certificates", certificateData);

    dispatch(createCertificateSuccess(data.message));
  } catch (error) {
    dispatch(
      createCertificateFailure(
        error.response?.data?.message || "Failed to create certificate",
      ),
    );
  }
};

export const updateCertificate =
  (certificateId, certificateData) => async (dispatch) => {
    try {
      dispatch(updateCertificateRequest());

      const { data } = await axiosInstance.patch(
        `/api/certificates/${certificateId}`,
        certificateData,
      );

      dispatch(updateCertificateSuccess(data.message));
    } catch (error) {
      dispatch(
        updateCertificateFailure(
          error.response?.data?.message || "Failed to update certificate",
        ),
      );
    }
  };

export const deleteCertificate = (certificateId) => async (dispatch) => {
  try {
    dispatch(deleteCertificateRequest());

    const { data } = await axiosInstance.delete(
      `/api/certificates/${certificateId}`,
    );

    dispatch(deleteCertificateSuccess(data.message));
  } catch (error) {
    dispatch(
      deleteCertificateFailure(
        error.response?.data?.message || "Failed to delete certificate",
      ),
    );
  }
};

export const verifyCertificate = (certificateNumber) => async (dispatch) => {
  try {
    dispatch(verifyCertificateRequest());

    const { data } = await axiosInstance.get(
      `/api/certificates/verify/${certificateNumber}`,
    );

    dispatch(verifyCertificateSuccess(data.data));
  } catch (error) {
    dispatch(
      verifyCertificateFailure(
        error.response?.data?.message || "Certificate not found",
      ),
    );
  }
};