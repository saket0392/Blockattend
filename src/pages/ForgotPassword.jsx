import { useState } from "react";
import "../styles/auth.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert("Reset link sent (check backend console for token in hackathon mode)");
      setEmail("");

    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Reset Password
        </h2>

        <input
          type="email"
          placeholder="Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;