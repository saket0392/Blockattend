import "../../styles/dashboard.css";

function FacultyDashboard() {
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Faculty</h2>
        <ul>
          <li>Dashboard</li>
          <li>My Courses</li>
          <li>Mark Attendance</li>
          <li>View Attendance</li>
          <li>Attendance History</li>
          <li>Logout</li>
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
