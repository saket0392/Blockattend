import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Student</h2>
        <ul>
          <li onClick={() => navigate("/student")}>Dashboard</li>
          <li onClick={() => navigate("/student/attendance")}>My Attendance</li>
          <li onClick={() => navigate("/student/courses")}>My Courses</li>
          <li onClick={() => navigate("/student/history")}>
            Attendance History
          </li>
          <li onClick={() => navigate("/student/profile")}>Profile</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header className="topbar">Student Attendance Dashboard</header>

        <section className="cards">
          <div className="card">Courses Enrolled: 5</div>
          <div className="card">Attendance Percentage: 86%</div>
          <div className="card">Classes Attended: 98</div>
          <div className="card">Classes Missed: 16</div>
        </section>
      </main>
    </div>
  );
}

export default StudentDashboard;
