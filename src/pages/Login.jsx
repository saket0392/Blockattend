import { useState } from "react";
import { Link } from "react-router-dom";
import RoleSelector from "../components/RoleSelector";
import "../styles/auth.css";

function Login() {
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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

        <button type="submit" disabled={!role}>
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
