import { createSlice } from "@reduxjs/toolkit";
import {
  fetchDownloads,
  fetchFaculties,
  fetchNews,
  fetchProgramById,
  fetchPrograms,
  fetchRecognitions,
  fetchTestimonials,
} from "@/store/actions/contentActions.js";

const setPending = (key) => (state) => {
  state.status[key] = "loading";
  state.errors[key] = null;
};

const setRejected = (key) => (state, action) => {
  state.status[key] = "failed";
  state.errors[key] = action.error.message || "Unable to load content.";
};

const contentSlice = createSlice({
  name: "content",
  initialState: {
    faculties: [],
    programs: [],
    testimonials: [],
    news: [],
    downloads: [],
    recognitions: [],
    selectedProgram: null,
    programsPagination: null,
    status: {
      faculties: "idle",
      programs: "idle",
      selectedProgram: "idle",
      testimonials: "idle",
      news: "idle",
      downloads: "idle",
      recognitions: "idle",
    },
    errors: {
      faculties: null,
      programs: null,
      selectedProgram: null,
      testimonials: null,
      news: null,
      downloads: null,
      recognitions: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFaculties.pending, setPending("faculties"))
      .addCase(fetchFaculties.fulfilled, (state, action) => {
        state.status.faculties = "succeeded";
        state.faculties = action.payload;
      })
      .addCase(fetchFaculties.rejected, setRejected("faculties"))
      .addCase(fetchPrograms.pending, setPending("programs"))
      .addCase(fetchPrograms.fulfilled, (state, action) => {
        state.status.programs = "succeeded";
        state.programs = action.payload.items;
        state.programsPagination = action.payload.pagination;
      })
      .addCase(fetchPrograms.rejected, setRejected("programs"))
      .addCase(fetchProgramById.pending, setPending("selectedProgram"))
      .addCase(fetchProgramById.fulfilled, (state, action) => {
        state.status.selectedProgram = "succeeded";
        state.selectedProgram = action.payload;
      })
      .addCase(fetchProgramById.rejected, setRejected("selectedProgram"))
      .addCase(fetchTestimonials.pending, setPending("testimonials"))
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.status.testimonials = "succeeded";
        state.testimonials = action.payload;
      })
      .addCase(fetchTestimonials.rejected, setRejected("testimonials"))
      .addCase(fetchNews.pending, setPending("news"))
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status.news = "succeeded";
        state.news = action.payload;
      })
      .addCase(fetchNews.rejected, setRejected("news"))
      .addCase(fetchDownloads.pending, setPending("downloads"))
      .addCase(fetchDownloads.fulfilled, (state, action) => {
        state.status.downloads = "succeeded";
        state.downloads = action.payload;
      })
      .addCase(fetchDownloads.rejected, setRejected("downloads"))
      .addCase(fetchRecognitions.pending, setPending("recognitions"))
      .addCase(fetchRecognitions.fulfilled, (state, action) => {
        state.status.recognitions = "succeeded";
        state.recognitions = action.payload;
      })
      .addCase(fetchRecognitions.rejected, setRejected("recognitions"));
  },
});

export default contentSlice.reducer;
