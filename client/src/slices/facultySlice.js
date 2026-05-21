import { createSlice } from "@reduxjs/toolkit";

const facultySlice = createSlice({
  name: "faculty",
  initialState: {
    faculties: [],
    loading: false,
    error: null,
    isLoaded: false,
  },
  reducers: {
    getFacultiesRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    getFacultiesSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isLoaded: true,
        faculties: action.payload,
      };
    },

    getFacultiesFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  getFacultiesRequest,
  getFacultiesSuccess,
  getFacultiesFail,
} = facultySlice.actions;

export default facultySlice.reducer;
