import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import Homepage from "./pages/Homepage";
import StudentProfile from "./pages/StudentProfile";
import HandwritingUpload from "./pages/HandwritingUpload";
import RANTest from "./pages/RANTest";
import BehaviouralQuestionnaire from "./pages/BehaviouralQuestionnaire";
import ConsentTestEmail from "./pages/ConsentTestEmail";
import ConsentInterventionEmail from "./pages/ConsentInterventionEmail";
import StudentDashboard from "./pages/StudentDashboard";
import SoundHunt from "./pages/SoundHunt";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/student/:id" element={<StudentProfile />} />

        {/* Test Pages */}
        <Route path="/handwriting-upload" element={<HandwritingUpload />} />
        <Route path="/ran-test" element={<RANTest />} />
        <Route path="/behavioural-questionnaire" element={<BehaviouralQuestionnaire />} />
        <Route path="/consent-test-email" element={<ConsentTestEmail />} />
        <Route path="/consent-intervention-email" element={<ConsentInterventionEmail />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/sound-hunt" element={<SoundHunt />} />

      </Routes>
    </Router>
  );
}