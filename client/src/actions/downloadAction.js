import axiosInstance from "../utils/axiosInstance";
import { getCollection, getError, groupDownloads } from "./contentHelper";
import {
  getDownloadsFail,
  getDownloadsRequest,
  getDownloadsSuccess,
} from "../slices/downloadSlice";

export const fetchDownloads = () => async (dispatch, getState) => {
  const { loading, isLoaded } = getState().download;
  if (loading || isLoaded) return;

  try {
    dispatch(getDownloadsRequest());
    const response = await axiosInstance.get("/downloads");
    const downloads = groupDownloads(getCollection(response));
    dispatch(getDownloadsSuccess(downloads));
  } catch (error) {
    dispatch(getDownloadsFail(getError(error, "Unable to load downloads.")));
  }
};
