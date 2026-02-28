import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "../../styles/attendance.css";

function ScanQR() {
  const qrCodeRef = useRef(null);
  const [scannedData, setScannedData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (qrCodeRef.current) return;

    const html5QrCode = new Html5Qrcode("qr-reader");
    qrCodeRef.current = html5QrCode;

    html5QrCode
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          try {
            const payload = JSON.parse(decodedText);
            const now = Date.now();

            if (now > payload.timestamp + payload.expiresIn) {
              setError("QR Code Expired ❌");
              html5QrCode.stop();
              return;
            }

            setScannedData(payload);
            setSuccess(true);
            html5QrCode.stop();
          } catch {
            setError("Invalid QR Code ❌");
          }
        },
      )
      .catch((err) => console.error("QR Start Error:", err));

    return () => {
      qrCodeRef.current?.stop().catch(() => {});
      qrCodeRef.current = null;
    };
  }, []);

  return (
    <div className="attendance-container">
      <h2>Scan Attendance QR</h2>

      {!success && !error && <div id="qr-reader" style={{ width: "300px" }} />}

      {success && (
        <div className="confirm-box">
          <p>QR Scanned Successfully ✅</p>
          <button
            onClick={() => {
              console.log("Attendance Payload:", scannedData);
            }}
          >
            Confirm Attendance
          </button>
        </div>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default ScanQR;
