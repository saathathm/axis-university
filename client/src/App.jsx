import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Layout from "./components/layout/Layout.jsx";
import AdminLayout from "./components/admin/AdminLayout.jsx";
import ProtectedRoute from "./components/admin/ProtectedRoute.jsx";

import ScrollToTop from "./utils/ScrollToTop.jsx";

import { loadUser } from "./features/auth/authActions.js";

import Home from "./pages/student/Home.jsx";
import About from "./pages/student/About.jsx";
import Recognitions from "./pages/student/Recognitions.jsx";
import Academics from "./pages/student/Academics.jsx";
import ProgramDetail from "./pages/student/ProgramDetail.jsx";
import Student from "./pages/student/Student.jsx";
import Apply from "./components/student/Apply.jsx";
import Policies from "./components/student/Policies.jsx";
import Contact from "./pages/student/Contact.jsx";
import Verify from "./pages/student/Verify.jsx";

import Login from "./pages/admin/Login.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import Applications from "./pages/admin/Applications.jsx";
import Students from "./pages/admin/Students.jsx";
import Enrollments from "./pages/admin/Enrollments.jsx";
import Faculties from "./pages/admin/faculties/Faculties.jsx";
import Courses from "./pages/admin/Courses.jsx";
import Certificates from "./pages/admin/Certificates.jsx";
import Downloads from "./pages/admin/Downloads.jsx";
import Testimonials from "./pages/admin/Testimonials.jsx";
import RecognitionsAdmin from "./pages/admin/Recognitions.jsx";
import Messages from "./pages/admin/Messages.jsx";
import NewsletterSubscriptions from "./pages/admin/NewsletterSubscriptions.jsx";

import CreateStudent from "./pages/admin/students/CreateStudent";
import CreateEnrollment from "./pages/admin/enrollments/CreateEnrollment.jsx";
import CreateFaculty from "./pages/admin/faculties/CreateFaculty";
import EditFaculty from "./pages/admin/faculties/EditFaculty.jsx";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(loadUser());
    }
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* Public user website */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/recognitions" element={<Recognitions />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/academics/:programId" element={<ProgramDetail />} />
          <Route path="/student" element={<Student />} />
          <Route path="/student/policies" element={<Policies />} />
          <Route path="/student/apply" element={<Apply />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify" element={<Verify />} />
        </Route>

        {/* Admin login without admin layout */}
        <Route path="/admin/login" element={<Login />} />

        {/* Protected admin panel */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<Dashboard />} />
            <Route path="/admin/applications" element={<Applications />} />
            <Route path="/admin/students" element={<Students />} />
            <Route path="/admin/enrollments" element={<Enrollments />} />
            <Route path="/admin/faculties" element={<Faculties />} />
            <Route path="/admin/courses" element={<Courses />} />
            <Route path="/admin/certificates" element={<Certificates />} />
            <Route path="/admin/downloads" element={<Downloads />} />
            <Route path="/admin/testimonials" element={<Testimonials />} />
            <Route path="/admin/recognitions" element={<RecognitionsAdmin />} />
            <Route path="/admin/messages" element={<Messages />} />
            <Route
              path="/admin/newsletter-subscriptions"
              element={<NewsletterSubscriptions />}
            />
            <Route path="/admin/students/create" element={<CreateStudent />} />
            <Route
              path="/admin/enrollments/create"
              element={<CreateEnrollment />}
            />
            <Route path="/admin/faculties/create" element={<CreateFaculty />} />
            <Route path="/admin/faculties/:id/edit" element={<EditFaculty />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
