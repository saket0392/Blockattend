import "../../styles/dashboard.css";

function StudentDashboard() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Student</h2>
        <ul>
          <li>Dashboard</li>
          <li>My Attendance</li>
          <li>My Courses</li>
          <li>Attendance History</li>
          <li>Profile</li>
          <li>Logout</li>
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
