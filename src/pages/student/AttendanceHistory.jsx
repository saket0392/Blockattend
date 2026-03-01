import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/attendancehistory.css";
import { apiFetch } from "../../utils/api";

function AttendanceHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } catch {
      // Ignore API errors.
    } finally {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchHistory = async () => {
      try {
        const data = await apiFetch("/api/attendance/me");
        if (isMounted) {
          setHistory(data);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load attendance history");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchHistory();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="history-container">
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
        <h2>Attendance History</h2>

        {loading && <p>Loading attendance history...</p>}
        {error && !loading && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && (
          <table className="history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item._id}>
                  <td>{item.date}</td>
                  <td>{item.courseName}</td>
                  <td className={item.status === "Present" ? "present" : "absent"}>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
}

export default AttendanceHistory;
