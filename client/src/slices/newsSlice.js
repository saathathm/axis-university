import { createSlice } from "@reduxjs/toolkit";

const newsSlice = createSlice({
  name: "news",
  initialState: {
    news: [],
    loading: false,
    error: null,
    isLoaded: false,
  },
  reducers: {
    getNewsRequest(state, action) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },

    getNewsSuccess(state, action) {
      return {
        ...state,
        loading: false,
        isLoaded: true,
        news: action.payload,
      };
    },

    getNewsFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const { getNewsRequest, getNewsSuccess, getNewsFail } = newsSlice.actions;

export default newsSlice.reducer;
