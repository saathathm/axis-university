import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import Recognitions from "./pages/Recognitions.jsx";
import Academics from "./pages/Academics.jsx";
import ProgramDetail from "./pages/ProgramDetail.jsx";
import Student from "./pages/student/Student.jsx";
import Policies from "./pages/student/Policies.jsx";
import Requirements from "./pages/student/Requirements.jsx";
import Apply from "./pages/student/Apply.jsx";
import Grading from "./pages/student/Grading.jsx";
import Download from "./pages/Download.jsx";
import Contact from "./pages/Contact.jsx";
import Verify from "./pages/Verify.jsx";
import NotFound from "./pages/NotFound.jsx";
import RequireAdmin from "./components/admin/RequireAdmin.jsx";
import AdminLogin from "./pages/admin/Login.jsx";
import AdminDashboard from "./pages/admin/Dashboard.jsx";
import AdminApplications from "./pages/admin/Applications.jsx";
import AdminFaculties from "./pages/admin/Faculties.jsx";
import AdminPrograms from "./pages/admin/Programs.jsx";
import AdminTestimonials from "./pages/admin/Testimonials.jsx";
import AdminStudents from "./pages/admin/Students.jsx";
import AdminCertificates from "./pages/admin/Certificates.jsx";
import AdminNews from "./pages/admin/News.jsx";
import AdminDownloads from "./pages/admin/Downloads.jsx";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/recognitions" element={<Recognitions />} />
        <Route path="/academics" element={<Academics />} />
        <Route path="/academics/:programId" element={<ProgramDetail />} />
        <Route path="/student" element={<Student />} />
        <Route path="/student/policies" element={<Policies />} />
        <Route path="/student/requirements" element={<Requirements />} />
        <Route path="/student/apply" element={<Apply />} />
        <Route path="/student/grading" element={<Grading />} />
        <Route path="/download" element={<Download />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<RequireAdmin />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/applications" element={<AdminApplications />} />
          <Route path="/admin/faculties" element={<AdminFaculties />} />
          <Route path="/admin/programs" element={<AdminPrograms />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/students" element={<AdminStudents />} />
          <Route path="/admin/certificates" element={<AdminCertificates />} />
          <Route path="/admin/news" element={<AdminNews />} />
          <Route path="/admin/downloads" element={<AdminDownloads />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
