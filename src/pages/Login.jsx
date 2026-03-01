import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RoleSelector from "../components/RoleSelector";
import "../styles/auth.css";

function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/login", // ✅ FIXED PORT
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password, // ✅ role NOT sent
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
        return;
      }

      // ✅ SAVE AUTH DATA
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("userId", data.userId);

      // ✅ REDIRECT BASED ON ROLE (FROM BACKEND)
      if (data.role === "student") {
        navigate("/student");
      } else if (data.role === "faculty") {
        navigate("/faculty");
      } else if (data.role === "admin") {
        navigate("/admin");
      }
    } catch (error) {
      console.error(error);
      alert("Server error. Try again.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>

        <RoleSelector role={role} setRole={setRole} />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

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
