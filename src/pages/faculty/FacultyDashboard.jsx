import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import { apiFetch } from "../../utils/api";

function FacultyDashboard() {
  const navigate = useNavigate();
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const data = await apiFetch("/api/dashboard/faculty");
        if (isMounted) {
          setDashboard(data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load faculty dashboard");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLogout = async () => {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore API errors.
    } finally {
      localStorage.clear();
      navigate("/login");
    }
  };

  const metrics = dashboard?.metrics;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Faculty Panel</h2>
        <ul>
          <li onClick={() => navigate("/faculty")}>Dashboard</li>
          <li onClick={() => navigate("/faculty/mark-attendance")}>Mark Attendance</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <main className="content">
        <header className="topbar">Faculty Attendance Dashboard</header>

        {loading && <p>Loading dashboard...</p>}
        {error && !loading && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && metrics && (
          <>
            <section className="cards">
              <div className="card">Sessions Created: {metrics.totalSessions}</div>
              <div className="card">Active Sessions: {metrics.activeSessions}</div>
              <div className="card">Students Marked: {metrics.totalStudentsMarked}</div>
              <div className="card">Today's Classes: {metrics.todaysClasses}</div>
            </section>

            <section style={{ marginTop: "24px" }}>
              <h3>Recent Sessions</h3>
              <ul>
                {dashboard.recentSessions.map((session) => (
                  <li key={session.id}>
                    {session.subject} — {session.isActive ? "Active" : "Closed"}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default FacultyDashboard;
