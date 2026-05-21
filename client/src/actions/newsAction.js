import axiosInstance from "../utils/axiosInstance";
import { getCollection, getError, normalizeNews } from "./contentHelper";
import { getNewsFail, getNewsRequest, getNewsSuccess } from "../slices/newsSlice";

export const fetchNews = () => async (dispatch, getState) => {
  const { loading, isLoaded } = getState().news;
  if (loading || isLoaded) return;

  try {
    dispatch(getNewsRequest());
    const response = await axiosInstance.get("/news");
    const news = getCollection(response).map(normalizeNews);
    dispatch(getNewsSuccess(news));
  } catch (error) {
    dispatch(getNewsFail(getError(error, "Unable to load news.")));
  }
};
