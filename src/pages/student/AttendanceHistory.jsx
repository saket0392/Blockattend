import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/attendancehistory.css";

function AttendanceHistory() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    try {
      await fetch("http://localhost:8000/api/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.warn("Logout API failed, clearing session locally");
    } finally {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    // TEMP: simulate backend data
    setHistory([
      {
        date: "2026-02-25",
        course: "DBMS",
        status: "Present",
      },
      {
        date: "2026-02-26",
        course: "Operating Systems",
        status: "Absent",
      },
      {
        date: "2026-02-27",
        course: "Computer Networks",
        status: "Present",
      },
    ]);
  }, []);

  return (
    <div className="history-container">
      <aside className="sidebar">
        <h2>Student Panel</h2>
        <ul>
          <li onClick={() => navigate("/student")}>Dashboard</li>
          <li onClick={() => navigate("/student/scan")}>Scan Now</li>
          <li onClick={() => navigate("/student/history")}>
            Attendance History
          </li>
          <li onClick={() => navigate("/student/profile")}>Profile</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      <main className="content">
        <h2>Attendance History</h2>

        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Course</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.course}</td>
                <td
                  className={item.status === "Present" ? "present" : "absent"}
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}

export default AttendanceHistory;
