import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "../../styles/attendance.css";

function ScanQR() {
  const qrCodeRef = useRef(null);
  const hasScanned = useRef(false);

  const [scannedData, setScannedData] = useState(null);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (qrCodeRef.current) return;

    const scanner = new Html5Qrcode("qr-reader");
    qrCodeRef.current = scanner;

    scanner
      .start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          if (hasScanned.current) return;
          hasScanned.current = true;

          try {
            const payload = JSON.parse(decodedText);
            const now = Date.now();

            if (now > payload.timestamp + payload.expiresIn) {
              setError("QR Code Expired ❌");
              scanner.stop();
              return;
            }

            setScannedData(payload);
            setSuccess(true);
            scanner.stop();
          } catch {
            setError("Invalid QR Code ❌");
            scanner.stop();
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
