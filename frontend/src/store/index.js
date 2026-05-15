import { configureStore } from "@reduxjs/toolkit";
import contentReducer from "./slices/contentSlice.js";
import applicationReducer from "./slices/applicationSlice.js";
import authReducer from "./slices/authSlice.js";

const store = configureStore({
  reducer: {
    content: contentReducer,
    application: applicationReducer,
    auth: authReducer,
  },
});

export default store;