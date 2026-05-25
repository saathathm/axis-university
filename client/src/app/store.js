import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import facultyReducer from "../features/faculty/facultySlice.js";
import testimonialReducer from "../features/testimonial/testimonialSlice.js";
import recognitionReducer from "../features/recognition/recognitionSlice.js";
import courseReducer from "../features/course/courseSlice.js";
import applicationReducer from "../features/application/applicationSlice.js";
import downloadReducer from "../features/download/downloadSlice";
import newsletterReducer from "../features/newsletter/newsletterSlice";
import messageReducer from "../features/message/messageSlice";
import certificateReducer from "../features/certificate/certificateSlice";
import studentReducer from "../features/student/studentSlice";
import enrollmentReducer from "../features/enrollment/enrollmentSlice";

const reducer = combineReducers({
  authState: authReducer,
  facultyState: facultyReducer,
  testimonialState: testimonialReducer,
  recognitionState: recognitionReducer,
  courseState: courseReducer,
  applicationState: applicationReducer,
  enrollmentState: enrollmentReducer,
  studentState: studentReducer,
  downloadState: downloadReducer,
  newsletterState: newsletterReducer,
  messageState: messageReducer,
  certificateState: certificateReducer,
});

const store = configureStore({ reducer });

export default store;
