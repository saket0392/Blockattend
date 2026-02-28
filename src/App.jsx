import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
// import GenerateQR from "./pages/attendance/GenerateQR";
// import ScanQR from "./pages/attendance/ScanQR";
// import AdminDashboard from "./pages/dashboards/AdminDashboard";
// import FacultyDashboard from "./pages/dashboards/FacultyDashboard";
// import StudentDashboard from "./pages/dashboards/StudentDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* <Route path="/dashboard/admin" element={<AdminDashboard />} />
      <Route path="/dashboard/faculty" element={<FacultyDashboard />} />
      <Route path="/dashboard/student" element={<StudentDashboard />} />

      <Route path="/faculty/generate-qr" element={<GenerateQR />} />
      <Route path="/student/scan-qr" element={<ScanQR />} /> */}
    </Routes>
  );
}

export default App;
