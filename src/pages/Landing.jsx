import { useNavigate } from "react-router-dom";
import "../styles/landing.css";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* HERO */}
      <header className="hero">
        <h1>BlockAttend</h1>
        <p>
          AI-Powered Smart Attendance Management System
          <br />
          Secure • Predictive • Real-Time
        </p>

        <div className="btn-group">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/login")}
          >
            Get Started
          </button>

          <button
            className="btn btn-outline"
            onClick={() =>
              document
                .getElementById("how-it-works")
                .scrollIntoView({ behavior: "smooth" })
            }
          >
            How It Works
          </button>
        </div>
      </header>

      {/* PROBLEM */}
      <section>
        <h2>Why Traditional Attendance Fails</h2>
        <div className="grid">
          <div className="card">
            <h3>❌ Proxy Attendance</h3>
            <p>Static QR codes and roll-call systems allow fake presence.</p>
          </div>

          <div className="card">
            <h3>❌ Manual Errors</h3>
            <p>
              Paper-based and manual systems are time-consuming and inaccurate.
            </p>
          </div>

          <div className="card">
            <h3>❌ No Early Warnings</h3>
            <p>
              Students realize attendance shortage only at the end of the term.
            </p>
          </div>

          <div className="card">
            <h3>❌ Poor Transparency</h3>
            <p>Students lack clear, real-time access to attendance records.</p>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="how-it-works">
        <h2>How BlockAttend Works</h2>

        <div className="grid">
          <div className="card">
            <h3>📸 Dynamic QR Attendance</h3>
            <p>
              Faculty initiates a live session generating a time-bound,
              dynamically changing QR code. This prevents screenshot reuse and
              proxy attendance.
            </p>
          </div>

          <div className="card">
            <h3>🧠 AI Attendance Analytics</h3>
            <p>
              Attendance is analyzed in real time. The system continuously
              calculates percentages and trends for each student.
            </p>
          </div>

          <div className="card">
            <h3>🚨 Risk Prediction</h3>
            <p>
              Students are categorized into Safe, Risk, and Danger zones. The
              system predicts how many classes are required to recover minimum
              attendance.
            </p>
          </div>

          <div className="card">
            <h3>🔐 Secure Attendance Logs</h3>
            <p>
              All attendance records are securely stored with role-based access,
              ensuring data integrity and transparency.
            </p>
          </div>
        </div>

        <p className="section-note">
          From attendance capture to predictive insights — everything is
          automated, intelligent, and secure.
        </p>
      </section>

      {/* FEATURES */}
      <section>
        <h2>Core Features</h2>
        <div className="grid">
          <div className="card">
            <h3>🔐 Dynamic QR Security</h3>
            <p>Time-bound QR codes prevent misuse and impersonation.</p>
          </div>

          <div className="card">
            <h3>📊 Attendance Prediction</h3>
            <p>AI predicts attendance recovery paths before shortages occur.</p>
          </div>

          <div className="card">
            <h3>🚨 Smart Alerts</h3>
            <p>Automatic warnings for low attendance thresholds.</p>
          </div>

          <div className="card">
            <h3>👨‍🏫 Faculty Dashboard</h3>
            <p>Quick attendance marking, viewing, and analytics.</p>
          </div>

          <div className="card">
            <h3>🎓 Student Dashboard</h3>
            <p>Transparent attendance history and real-time status.</p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>BlockAttend © 2026 · Smart Attendance Made Simple</p>
      </footer>
    </div>
  );
}

export default Landing;
