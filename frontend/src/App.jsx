import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Login from "./pages/auth/Login.jsx";
import Signin from "./pages/auth/Signin.jsx";
import NotFound from "./pages/NotFound.jsx";

function App() {
  return (
    <BrowserRouter>
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
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signin" element={<Signin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
