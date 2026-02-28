import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoleSelector from "../components/RoleSelector";
import "../styles/auth.css";
function Login() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!role) return;

    switch (role) {
      case "student":
        navigate("/dashboards/StudentDashboard");
        break;
      case "faculty":
        navigate("/dashboards/FacultyDashboard");
        break;
      case "admin":
        navigate("/dashboards/AdminDashboard");
        break;
      default:
        break;
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

        <RoleSelector role={role} setRole={setRole} />

        {(role === "student" || role === "faculty") && (
          <>
            <input type="text" placeholder="CRN" required />
            <input type="password" placeholder="Password" required />
          </>
        )}

        {role === "admin" && (
          <>
            <input type="text" placeholder="Admin Security Code" required />
            <input type="password" placeholder="Password" required />
          </>
        )}

        <button type="submit" disabled={!role} onClick={() => navigate("/")}>
          Login
        </button>

        <Link to="/forgot-password" className="link">
          Forgot Password?
        </Link>
        <Link to="/register" className="link">
          Don't have an account?
        </Link>
      </form>
    </div>
  );
}

export default Login;
