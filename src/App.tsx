import { Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import ProtectedRoute from "./components/ui/ProtectedRoute";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ResourceDetails from "./pages/ResourceDetails";
import AddResource from "./pages/AddResource";
import ManageResources from "./pages/ManageResources";
import StudyGroups from "./pages/StudyGroups";
import StudyGroupDetails from "./pages/StudyGroupDetails";
import CreateStudyGroup from "./pages/CreateStudyGroup";
import Tutors from "./pages/Tutors";
import TutorDetails from "./pages/TutorDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Admin from "./pages/Admin";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import PrivacyTerms from "./pages/PrivacyTerms";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Explore />} />
          <Route path="/resources/add" element={<ProtectedRoute><AddResource /></ProtectedRoute>} />
          <Route path="/resources/manage" element={<ProtectedRoute><ManageResources /></ProtectedRoute>} />
          <Route path="/resources/:id" element={<ResourceDetails />} />

          <Route path="/study-groups" element={<StudyGroups />} />
          <Route path="/study-groups/create" element={<ProtectedRoute><CreateStudyGroup /></ProtectedRoute>} />
          <Route path="/study-groups/:id" element={<StudyGroupDetails />} />

          <Route path="/tutors" element={<Tutors />} />
          <Route path="/tutors/:id" element={<TutorDetails />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute adminOnly><Admin /></ProtectedRoute>} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/privacy-terms" element={<PrivacyTerms />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
