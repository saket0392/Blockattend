import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/dashboard.css";

function StudentDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const verifyAuth = async () => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");

      if (!token || role !== "student") {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const res = await fetch("http://localhost:8000/api/auth/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Invalid token");
      } catch (err) {
        if (isMounted) {
          localStorage.clear();
          navigate("/login", { replace: true });
        }
      }
    };

    verifyAuth();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

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
      // backend failure should NOT block logout
      console.warn("Logout API failed, clearing session locally");
    } finally {
      localStorage.clear();
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="dashboard">
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
