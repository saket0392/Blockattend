import "../../styles/dashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin</h2>
        <ul>
          <li>Dashboard</li>
          <li>Manage Faculty</li>
          <li>Manage Students</li>
          <li>Create Courses</li>
          <li>Attendance Logs</li>
          <li>Logout</li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="content">
        <header className="topbar">Attendance Management Dashboard</header>

        <section className="cards">
          <div className="card">Total Students: 450</div>
          <div className="card">Total Faculty: 32</div>
          <div className="card">Courses Active: 18</div>
          <div className="card">Attendance Records: 12,540</div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;
