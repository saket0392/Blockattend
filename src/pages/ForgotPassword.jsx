import "../styles/auth.css";

function ForgotPassword() {
  return (
    <div className="auth-container">
      <form className="auth-form">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          Reset Password
        </h2>
        <input type="email" placeholder="Registered Email" />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
