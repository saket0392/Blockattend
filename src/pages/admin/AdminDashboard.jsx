import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../../utils/api";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const loadDashboard = async () => {
      try {
        const response = await apiFetch("/api/dashboard/admin");
        if (isMounted) {
          setData(response);
          setError("");
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Failed to load admin dashboard");
        }
      } finally {
        if (isMounted) setLoading(false);
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
      // Ignore API failures.
    } finally {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  const topRiskStudents = useMemo(() => {
    if (!data?.students) return [];
    return [...data.students].sort((a, b) => a.percentage - b.percentage).slice(0, 5);
  }, [data]);

  const summary = data?.summary;

  return (
    <div style={{ padding: "40px", background: "#0f172a", minHeight: "100vh", color: "#fff" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
        <h1 style={{ fontSize: "34px", marginBottom: "10px" }}>📊 Admin Intelligence Dashboard</h1>
        <button onClick={handleLogout} style={{ height: "fit-content", padding: "10px 16px" }}>Logout</button>
      </div>

      {loading && <p>Loading admin dashboard...</p>}
      {error && !loading && <p style={{ color: "#f87171" }}>{error}</p>}

      {!loading && !error && summary && (
        <>
          <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
            <div style={cardStyle("#16a34a")}><h3>SAFE</h3><h2>{summary.safeCount}</h2></div>
            <div style={cardStyle("#f59e0b")}><h3>RISK</h3><h2>{summary.riskCount}</h2></div>
            <div style={cardStyle("#dc2626")}><h3>DANGER</h3><h2>{summary.dangerCount}</h2></div>
          </div>

          <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
            <div>Total Users: {summary.totalUsers}</div>
            <div>Total Students: {summary.totalStudents}</div>
            <div>Total Faculty: {summary.totalFaculty}</div>
            <div>Total Admins: {summary.totalAdmins}</div>
          </div>

          <h2>Overall Attendance Health</h2>
          <div style={{ background: "#1e293b", borderRadius: "12px", height: "25px", overflow: "hidden", marginBottom: "30px" }}>
            <div style={{ width: `${summary.averageAttendance}%`, background: "#3b82f6", height: "100%", textAlign: "center", lineHeight: "25px", fontWeight: "bold" }}>
              {summary.averageAttendance}%
            </div>
          </div>

          <h2>Top 5 At Risk Students</h2>
          <ul style={{ marginBottom: "30px" }}>
            {topRiskStudents.map((student) => (
              <li key={student.studentId}>{student.name} — {student.percentage}%</li>
            ))}
          </ul>

          <h2>Department Performance</h2>
          <ul style={{ marginBottom: "30px" }}>
            {data.departmentAverages.map((dept) => (
              <li key={dept.department}>{dept.department} — {dept.averageAttendance}% ({dept.studentCount} students)</li>
            ))}
          </ul>

          <h2>Student Analytics</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", background: "#1e293b", borderRadius: "12px" }}>
              <thead style={{ background: "#334155" }}>
                <tr>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Department</th>
                  <th style={thStyle}>Attendance %</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Required To Reach 75%</th>
                </tr>
              </thead>
              <tbody>
                {data.students.map((student) => (
                  <tr key={student.studentId} style={{ textAlign: "center" }}>
                    <td style={tdStyle}>{student.name}</td>
                    <td style={tdStyle}>{student.department}</td>
                    <td style={tdStyle}>{student.percentage}%</td>
                    <td style={tdStyle}>{student.status}</td>
                    <td style={tdStyle}>{student.requiredToReach75}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

const cardStyle = (color) => ({
  flex: 1,
  background: "#1e293b",
  padding: "25px",
  borderRadius: "16px",
  textAlign: "center",
  borderLeft: `6px solid ${color}`,
  boxShadow: "0 4px 15px rgba(0,0,0,0.5)",
});

const thStyle = { padding: "14px", fontWeight: "bold" };
const tdStyle = { padding: "14px", borderBottom: "1px solid #334155" };

export default AdminDashboard;
