import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

function FacultyDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Faculty</h2>
        <ul>
          <li onClick={() => navigate("/faculty")}>Dashboard</li>
          <li onClick={() => navigate("/faculty/courses")}>My Courses</li>
          <li onClick={() => navigate("/faculty/mark-attendance")}>
            Mark Attendance
          </li>
          <li onClick={() => navigate("/faculty/view-attendance")}>
            View Attendance
          </li>
          <li onClick={() => navigate("/faculty/history")}>
            Attendance History
          </li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header className="topbar">Faculty Attendance Dashboard</header>

        <section className="cards">
          <div className="card">My Courses: 4</div>
          <div className="card">Total Students: 120</div>
          <div className="card">Today's Classes: 3</div>
          <div className="card">Attendance Sessions Taken: 320</div>
        </section>
      </main>
    </div>
  );
}

export default FacultyDashboard;
