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

  const average =
    analyticsData.length > 0
      ? (
          analyticsData.reduce((sum, a) => sum + a.percentage, 0) /
          analyticsData.length
        ).toFixed(2)
      : 0;

  return (
    <div style={{ padding: "30px", color: "white" }}>
      <h1>Admin Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "30px" }}>
        <div className="risk-card safe">
          <h3>SAFE</h3>
          <p>{safeCount}</p>
        </div>

        <div className="risk-card risk">
          <h3>RISK</h3>
          <p>{riskCount}</p>
        </div>

        <div className="risk-card danger">
          <h3>DANGER</h3>
          <p>{dangerCount}</p>
        </div>
      </div>

      <h2 style={{ marginTop: "40px" }}>Overall Attendance Health</h2>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${average}%` }}
        >
          {average}%
        </div>
      </div>

      <h2 style={{ marginTop: "40px" }}>Student Analytics</h2>
      <table className="alert-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Attendance %</th>
            <th>Status</th>
            <th>Required Classes</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            const analytics = analyticsData[index];
            if (!analytics) return null;

            return (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{analytics.percentage}%</td>
                <td>{analytics.status}</td>
                <td>{analytics.requiredClasses}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;