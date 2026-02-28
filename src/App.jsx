import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

// import GenerateQR from "./pages/attendance/GenerateQR";
// import ScanQR from "./pages/attendance/ScanQR";

import AdminDashboard from "./pages/dashboards/AdminDashboard";
import FacultyDashboard from "./pages/dashboards/FacultyDashboard";
import StudentDashboard from "./pages/dashboards/StudentDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/faculty/dashboard" element={<FacultyDashboard />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />

      {/* Admin Dashboard */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/faculty" element={<div>Manage Faculty Page</div>} />
      <Route path="/admin/students" element={<div>Manage Students Page</div>} />
      <Route
        path="/admin/attendance"
        element={<div>Attendance Logs Page</div>}
      />
      <Route path="/login" element={<div>Login Page</div>} />

      {/* Faculty Dashboard */}
      <Route path="/faculty" element={<FacultyDashboard />} />
      <Route path="/faculty/courses" element={<div>My Courses Page</div>} />
      <Route
        path="/faculty/mark-attendance"
        element={<div>Mark Attendance Page</div>}
      />
      <Route
        path="/faculty/view-attendance"
        element={<div>View Attendance Page</div>}
      />
      <Route
        path="/faculty/history"
        element={<div>Attendance History Page</div>}
      />
      {/* Student Dashboard */}
      <Route path="/student" element={<StudentDashboard />} />
      <Route
        path="/student/attendance"
        element={<div>My Attendance Page</div>}
      />
      <Route path="/student/courses" element={<div>My Courses Page</div>} />
      <Route
        path="/student/history"
        element={<div>Attendance History Page</div>}
      />
      <Route
        path="/student/profile"
        element={<div>Student Profile Page</div>}
      />

      {/* <Route path="/faculty/generate-qr" element={<GenerateQR />} />
      <Route path="/student/scan-qr" element={<ScanQR />} /> */}
    </Routes>
  );
}

export default App;
