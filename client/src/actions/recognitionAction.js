import axiosInstance from "../utils/axiosInstance";
import { getCollection, getError, normalizeRecognition } from "./contentHelper";
import {
  getRecognitionsFail,
  getRecognitionsRequest,
  getRecognitionsSuccess,
} from "../slices/recognitionSlice";

export const fetchRecognitions = () => async (dispatch, getState) => {
  const { loading, isLoaded } = getState().recognition;
  if (loading || isLoaded) return;

  try {
    dispatch(getRecognitionsRequest());
    const response = await axiosInstance.get("/recognitions");
    const recognitions = getCollection(response).map(normalizeRecognition);
    dispatch(getRecognitionsSuccess(recognitions));
  } catch (error) {
    dispatch(getRecognitionsFail(getError(error, "Unable to load recognitions.")));
  }
};
