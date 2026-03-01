import { Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";

import GenerateQR from "./pages/attendance/GenerateQR";
import ScanQR from "./pages/attendance/ScanQR";

import AdminDashboard from "./pages/admin/AdminDashboard";
import FacultyDashboard from "./pages/faculty/FacultyDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import AttendanceHistory from "./pages/student/AttendanceHistory";
import StudentProfile from "./pages/student/StudentProfile";

import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Admin Routes */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRole="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Faculty Routes */}
      <Route
        path="/faculty/*"
        element={
          <ProtectedRoute allowedRole="faculty">
            <FacultyDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/faculty/mark-attendance"
        element={
          <ProtectedRoute allowedRole="faculty">
            <GenerateQR />
          </ProtectedRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/student/*"
        element={
          <ProtectedRoute allowedRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/student/profile" element={<StudentProfile />} />
      <Route
        path="/student/scan"
        element={
          <ProtectedRoute allowedRole="student">
            <ScanQR />
          </ProtectedRoute>
        }
      />
      <Route path="/student/history" element={<AttendanceHistory />} />
    </Routes>
  );
}

export default App;
