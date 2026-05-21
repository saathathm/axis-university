import axiosInstance from "../utils/axiosInstance";
import { getCollection, getError, normalizeFaculty } from "./contentHelper";
import {
  getFacultiesFail,
  getFacultiesRequest,
  getFacultiesSuccess,
} from "../slices/facultySlice";

export const fetchFaculties = () => async (dispatch, getState) => {
  const { loading, isLoaded } = getState().faculty;
  if (loading || isLoaded) return;

  try {
    dispatch(getFacultiesRequest());
    const response = await axiosInstance.get("/faculties");
    const faculties = getCollection(response).map(normalizeFaculty);
    dispatch(getFacultiesSuccess(faculties));
  } catch (error) {
    dispatch(getFacultiesFail(getError(error, "Unable to load faculties.")));
  }
};
