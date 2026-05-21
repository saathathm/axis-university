import axiosInstance from "../utils/axiosInstance";
import { getCollection, getError, normalizeProgram } from "./contentHelper";
import {
  getProgramFail,
  getProgramRequest,
  getProgramSuccess,
  getProgramsFail,
  getProgramsRequest,
  getProgramsSuccess,
} from "../slices/programSlice";

export const fetchPrograms = () => async (dispatch, getState) => {
  const { loading, isLoaded } = getState().program;
  if (loading || isLoaded) return;

  try {
    dispatch(getProgramsRequest());
    const response = await axiosInstance.get("/programs");
    const programs = getCollection(response).map(normalizeProgram);

    dispatch(
      getProgramsSuccess({
        items: programs,
        pagination: response.data.data?.meta ?? null,
      })
    );
  } catch (error) {
    dispatch(getProgramsFail(getError(error, "Unable to load programs.")));
  }
};

export const fetchProgramById = (programId) => async (dispatch, getState) => {
  const { selectedProgram, programLoading } = getState().program;

  if (programLoading) return;
  if (String(selectedProgram?.id || "") === String(programId)) return;

  try {
    dispatch(getProgramRequest());
    const response = await axiosInstance.get(`/programs/${programId}`);
    dispatch(getProgramSuccess(normalizeProgram(response.data.data)));
  } catch (error) {
    dispatch(getProgramFail(getError(error, "Unable to load program.")));
  }
};
