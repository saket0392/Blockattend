import { useState } from "react";
import { Link } from "react-router-dom";
import RoleSelector from "../components/RoleSelector";
import "../styles/auth.css";

function Register() {
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Register</h2>

        <RoleSelector role={role} setRole={setRole} />

        {(role === "student" || role === "faculty") && (
          <>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="CRN" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
          </>
        )}

        {role === "admin" && (
          <>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="text" placeholder="Admin Security Code" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
          </>
        )}

        <button type="submit" disabled={!role}>
          Register
        </button>

        <Link to="/login" className="link">
          Already have an account?
        </Link>
      </form>
    </div>
  );
}

export default Register;
