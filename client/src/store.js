import { configureStore } from "@reduxjs/toolkit";

import applicationReducer from "./slices/applicationSlice";
import authReducer from "./slices/authSlice";
import downloadReducer from "./slices/downloadSlice";
import facultyReducer from "./slices/facultySlice";
import newsReducer from "./slices/newsSlice";
import programReducer from "./slices/programSlice";
import recognitionReducer from "./slices/recognitionSlice";
import testimonialReducer from "./slices/testimonialSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    application: applicationReducer,
    faculty: facultyReducer,
    program: programReducer,
    testimonial: testimonialReducer,
    news: newsReducer,
    download: downloadReducer,
    recognition: recognitionReducer,
  },
});

export default store;
