import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";
import { apiFetch } from "../../utils/api";

function StudentDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const data = await apiFetch("/api/dashboard/student");
        if (isMounted) {
          setDashboard(data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load dashboard");
          if ((err.message || "").toLowerCase().includes("not authorized")) {
            localStorage.clear();
            navigate("/login", { replace: true });
          }
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadDashboard();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore API failure; clear local session anyway.
    } finally {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  const metrics = dashboard?.metrics;

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Student Panel</h2>
        <ul>
          <li onClick={() => navigate("/student")}>Dashboard</li>
          <li onClick={() => navigate("/student/scan")}>Scan Now</li>
          <li onClick={() => navigate("/student/history")}>Attendance History</li>
          <li onClick={() => navigate("/student/profile")}>Profile</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <main className="content">
        <header className="topbar">Student Attendance Dashboard</header>

        {loading && <p>Loading dashboard...</p>}
        {error && !loading && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && metrics && (
          <>
            <section className="cards">
              <div className="card">Total Classes: {metrics.totalClasses}</div>
              <div className="card">Attendance: {metrics.attendancePercentage}%</div>
              <div className="card">Classes Attended: {metrics.attendedClasses}</div>
              <div className="card">Classes Missed: {metrics.missedClasses}</div>
            </section>

            <section style={{ marginTop: "20px" }}>
              <h3>Attendance Status: {metrics.status}</h3>
              <p>Classes needed to reach 75%: {metrics.requiredToReach75}</p>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

export default StudentDashboard;
