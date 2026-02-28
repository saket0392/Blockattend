import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear auth data if any
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin</h2>
        <ul>
          <li onClick={() => navigate("/admin")}>Dashboard</li>
          <li onClick={() => navigate("/admin/faculty")}>Manage Faculty</li>
          <li onClick={() => navigate("/admin/students")}>Manage Students</li>
          <li onClick={() => navigate("/admin/attendance")}>Attendance Logs</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header className="topbar">Attendance Management Dashboard</header>

        <section className="cards">
          <div className="card">Total Students: 858</div>
          <div className="card">Total Faculty: 132</div>
          <div className="card">Active Courses: 28</div>
          <div className="card">Attendance Records: 12,540</div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
