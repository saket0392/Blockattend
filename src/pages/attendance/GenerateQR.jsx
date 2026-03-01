import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "../../styles/attendance.css";
import { apiFetch } from "../../utils/api";

function GenerateQR() {
  const [subject, setSubject] = useState("");
  const [qrData, setQrData] = useState("");
  const [sessionMeta, setSessionMeta] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      if (sessionMeta?.sessionId) {
        apiFetch("/api/session/close", {
          method: "POST",
          body: JSON.stringify({ sessionId: sessionMeta.sessionId }),
        }).catch(() => {});
      }
    };
  }, [sessionMeta]);

  const createSession = async () => {
    if (!subject.trim()) {
      setError("Subject is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = {
        subject,
        facultyName: localStorage.getItem("facultyName") || "Faculty",
      };

      const session = await apiFetch("/api/session/create", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const qrPayload = JSON.stringify({
        sessionId: session.sessionId,
        nonce: session.nonce,
      });

      setSessionMeta(session);
      setQrData(qrPayload);
    } catch (err) {
      setError(err.message || "Failed to create attendance session");
    } finally {
      setLoading(false);
    }
  };

  const closeSession = async () => {
    if (!sessionMeta?.sessionId) return;

    try {
      await apiFetch("/api/session/close", {
        method: "POST",
        body: JSON.stringify({ sessionId: sessionMeta.sessionId }),
      });
      setSessionMeta(null);
      setQrData("");
    } catch (err) {
      setError(err.message || "Failed to close session");
    }
  };

  return (
    <div className="attendance-container">
      <h2>Generate Attendance QR</h2>

      <div className="qr-box" style={{ marginBottom: "20px" }}>
        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject"
          style={{ padding: "10px", width: "250px", marginRight: "10px" }}
        />
        <button onClick={createSession} disabled={loading}>
          {loading ? "Creating..." : "Create Session"}
        </button>
        <button onClick={closeSession} disabled={!sessionMeta} style={{ marginLeft: "10px" }}>
          Close Session
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {qrData && (
        <div className="qr-box">
          <QRCodeCanvas value={qrData} size={220} />
          <p>Session ID: {sessionMeta?.sessionId}</p>
          <p>Valid until: {sessionMeta?.expiryTime ? new Date(sessionMeta.expiryTime).toLocaleString() : "-"}</p>
        </div>
      )}
    </div>
  );
}

export default GenerateQR;
