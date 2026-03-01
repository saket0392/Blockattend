import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import { Outlet } from "react-router-dom";

function StudentDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    
    if (!token) {
      navigate("/login");
      return;
    }

    
    if (role !== "student") {
      navigate("/login");
    }

  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Student Panel</h2>
        <ul>
          <li onClick={() => navigate("/student")}>Dashboard</li>
          <li onClick={() => navigate("/student/attendance")}>
            My Attendance
          </li>
          <li onClick={() => navigate("/student/courses")}>
            My Courses
          </li>
          <li onClick={() => navigate("/student/history")}>
            Attendance History
          </li>
          <li onClick={() => navigate("/student/profile")}>
            Profile
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      
      <main className="content">
        <header className="topbar">
          Student Attendance Dashboard
        </header>

        <section className="cards">
          <div className="card">Courses Enrolled: 5</div>
          <div className="card">Attendance Percentage: 86%</div>
          <div className="card">Classes Attended: 98</div>
          <div className="card">Classes Missed: 16</div>
        </section>
        <Outlet />
      </main>
    </div>
  );
}

export default StudentDashboard;