import { createSlice } from "@reduxjs/toolkit";

const programSlice = createSlice({
  name: "program",
  initialState: {
    programs: [],
    selectedProgram: null,
    pagination: null,
    loading: false,
    programLoading: false,
    error: null,
    programError: null,
    isLoaded: false,
  },
  reducers: {
    getProgramsRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    getProgramsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isLoaded: true,
        programs: action.payload.items,
        pagination: action.payload.pagination,
      };
    },

    getProgramsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },

    getProgramRequest(state, action) {
      return {
        ...state,
        programLoading: true,
        programError: null,
      };
    },

    getProgramSuccess(state, action) {
      return {
        ...state,
        programLoading: false,
        selectedProgram: action.payload,
      };
    },

    getProgramFail(state, action) {
      return {
        ...state,
        programLoading: false,
        programError: action.payload,
      };
    },
  },
});

export const {
  getProgramsRequest,
  getProgramsSuccess,
  getProgramsFail,
  getProgramRequest,
  getProgramSuccess,
  getProgramFail,
} = programSlice.actions;

export default programSlice.reducer;
