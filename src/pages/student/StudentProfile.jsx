import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/studentprofile.css";
import { apiFetch } from "../../utils/api";

function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await apiFetch("/api/students/me");
        setStudent(data);
      } catch (err) {
        setError(err.message || "Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  if (error) return <p>{error}</p>;
  if (!student) return <p>Loading...</p>;

  return (
    <div className="profile-layout">
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

      <main className="profile-container">
        <h2>My Profile</h2>

        <div className="profile-card">
          <div className="profile-row">
            <span>Name</span>
            <p>{student.name}</p>
          </div>

          <div className="profile-row">
            <span>Roll No</span>
            <p>{student.rollNumber}</p>
          </div>

          <div className="profile-row">
            <span>Department</span>
            <p>{student.department}</p>
          </div>

          <div className="profile-row">
            <span>Total Classes</span>
            <p>{student.totalClasses}</p>
          </div>

          <div className="profile-row">
            <span>Attended</span>
            <p>{student.attendedClasses}</p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default StudentProfile;
