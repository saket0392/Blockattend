import React, { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [analyticsData, setAnalyticsData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/students")
      .then(res => res.json())
      .then(async (data) => {
        setStudents(data);

        const analyticsPromises = data.map(student =>
          fetch(`http://localhost:8000/api/students/${student._id}/analytics`)
            .then(res => res.json())
        );

        const analyticsResults = await Promise.all(analyticsPromises);
        setAnalyticsData(analyticsResults);
      })
      .catch(err => console.error(err));
  }, []);

  const safeCount = analyticsData.filter(a => a.status === "SAFE").length;
  const riskCount = analyticsData.filter(a => a.status === "RISK").length;
  const dangerCount = analyticsData.filter(a => a.status === "DANGER").length;

  const criticalStudents = analyticsData.filter(a => a.percentage < 60);
  const warningStudents = analyticsData.filter(a => a.percentage >= 60 && a.percentage < 75);
  const excellentStudents = analyticsData.filter(a => a.percentage >= 90);

  const topRiskStudents = [...analyticsData]
    .sort((a, b) => a.percentage - b.percentage)
    .slice(0, 5);

  const average =
    analyticsData.length > 0
      ? (
          analyticsData.reduce((sum, a) => sum + a.percentage, 0) /
          analyticsData.length
        ).toFixed(2)
      : 0;

  const departmentStats = students.reduce((acc, student, index) => {
    const dept = student.department;
    const percentage = analyticsData[index]?.percentage || 0;

    if (!acc[dept]) {
      acc[dept] = { total: 0, sum: 0 };
    }

    acc[dept].total += 1;
    acc[dept].sum += percentage;

    return acc;
  }, {});

  const departmentAverages = Object.keys(departmentStats).map(dept => ({
    department: dept,
    average: (
      departmentStats[dept].sum / departmentStats[dept].total
    ).toFixed(2)
  }));

  const adminInsight =
    dangerCount > students.length * 0.4
      ? "⚠ High academic risk detected. Immediate intervention required."
      : "✅ Attendance levels are stable across departments.";

  const getStatusColor = (status) => {
    if (status === "SAFE") return "#16a34a";
    if (status === "RISK") return "#f59e0b";
    return "#dc2626";
  };

  return (
    <div style={{ padding: "40px", background: "#0f172a", minHeight: "100vh", color: "#fff" }}>
      
      <h1 style={{ fontSize: "34px", marginBottom: "30px" }}>
        📊 Admin Intelligence Dashboard
      </h1>

      {/* Risk Cards */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div style={cardStyle("#16a34a")}>
          <h3>SAFE</h3>
          <h2>{safeCount}</h2>
        </div>

        <div style={cardStyle("#f59e0b")}>
          <h3>RISK</h3>
          <h2>{riskCount}</h2>
        </div>

        <div style={cardStyle("#dc2626")}>
          <h3>DANGER</h3>
          <h2>{dangerCount}</h2>
        </div>
      </div>

      {/* Insight Box */}
      <div style={{
        background: "#1e293b",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "30px"
      }}>
        <h3>AI Insight</h3>
        <p>{adminInsight}</p>
      </div>

      {/* Critical Breakdown */}
      <div style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        <div>🚨 Critical (&lt;60%): {criticalStudents.length}</div>
        <div>⚠ Warning (60-75%): {warningStudents.length}</div>
        <div>🔥 Excellent (90%+): {excellentStudents.length}</div>
      </div>

      {/* Progress Bar */}
      <h2>Overall Attendance Health</h2>
      <div style={{
        background: "#1e293b",
        borderRadius: "12px",
        height: "25px",
        overflow: "hidden",
        marginBottom: "40px"
      }}>
        <div
          style={{
            width: `${average}%`,
            background: "#3b82f6",
            height: "100%",
            textAlign: "center",
            lineHeight: "25px",
            fontWeight: "bold",
            transition: "0.5s"
          }}
        >
          {average}%
        </div>
      </div>

      {/* Top Risk Students */}
      <h2>Top 5 At Risk Students</h2>
      <ul style={{ marginBottom: "30px" }}>
  {topRiskStudents.map((s, i) => {
    const student = students.find(st => st._id === s.studentId);

    return (
      <li key={i}>
        {student ? student.name : "Unknown"} — {s.percentage}%
      </li>
    );
  })}
</ul>

      {/* Department Performance */}
      <h2>Department Performance</h2>
      <ul style={{ marginBottom: "30px" }}>
        {departmentAverages.map((d, i) => (
          <li key={i}>
            {d.department} — {d.average}%
          </li>
        ))}
      </ul>

      {/* Student Table */}
      <h2>Student Analytics</h2>
      <div style={{ overflowX: "auto" }}>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "#1e293b",
          borderRadius: "12px"
        }}>
          <thead style={{ background: "#334155" }}>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Attendance %</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Required Classes</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const analytics = analyticsData[index];
              if (!analytics) return null;

              return (
                <tr key={student._id} style={{ textAlign: "center" }}>
                  <td style={tdStyle}>{student.name}</td>
                  <td style={tdStyle}>{analytics.percentage}%</td>
                  <td style={tdStyle}>
                    <span style={{
                      padding: "6px 14px",
                      borderRadius: "20px",
                      background: getStatusColor(analytics.status),
                      fontWeight: "bold"
                    }}>
                      {analytics.status}
                    </span>
                  </td>
                  <td style={tdStyle}>{analytics.requiredClasses}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

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
  boxShadow: "0 4px 15px rgba(0,0,0,0.5)"
});

const thStyle = {
  padding: "14px",
  fontWeight: "bold"
};

const tdStyle = {
  padding: "14px",
  borderBottom: "1px solid #334155"
};

export default AdminDashboard;