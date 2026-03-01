import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "../../styles/attendance.css";

function ScanQR() {
  const scannerRef = useRef(null);
  const hasInitialized = useRef(false);

  const [status, setStatus] = useState("scanning");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (hasInitialized.current) return; // 🔥 Prevent double mount
    hasInitialized.current = true;

    const html5QrCode = new Html5Qrcode("qr-reader");
    scannerRef.current = html5QrCode;

    html5QrCode
      .start(
        { facingMode: "user" },
        { fps: 10, qrbox: 250 },
        handleScan
      )
      .catch((err) => {
        console.log("Camera error:", err);
        setStatus("error");
        setMessage("Camera not accessible");
      });

    return () => {
      if (scannerRef.current) {
        scannerRef.current
          .stop()
          .then(() => scannerRef.current.clear())
          .catch(() => {});
      }
    };
  }, []);

  const handleScan = async (decodedText) => {
    try {
      const payload = JSON.parse(decodedText);
      console.log("Scanned:", payload);

      setStatus("success");
      setMessage("QR Detected ✅");

      await scannerRef.current.stop();
      await scannerRef.current.clear();
      // Try to capture geolocation and submit attendance
      if (!navigator.geolocation) {
        setStatus("error");
        setMessage("Geolocation not supported by this browser");
        return;
      }

      const submitWithLocation = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const studentId = localStorage.getItem("userId");

        fetch("http://localhost:8000/api/attendance/mark", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId,
            sessionId: payload.sessionId,
            nonce: payload.nonce,
            latitude,
            longitude,
          }),
        })
          .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
          .then(({ ok, data }) => {
            if (!ok) {
              setStatus("error");
              setMessage(data.message || "Failed to mark attendance");
            } else {
              setStatus("success");
              setMessage(data.message || "Attendance marked");
            }
          })
          .catch((err) => {
            console.error(err);
            setStatus("error");
            setMessage("Network error while marking attendance");
          });
      };

      const handleGeoErr = (err) => {
        console.error("Geolocation error:", err);
        setStatus("error");
        setMessage("Unable to get location. Enable location services and try again.");
      };

      navigator.geolocation.getCurrentPosition(submitWithLocation, handleGeoErr, {
        enableHighAccuracy: true,
        timeout: 10000,
      });
    } catch {
      setStatus("error");
      setMessage("Invalid QR");
    }
  };

  return (
    <div className="attendance-container">
      <h2>Scan Attendance QR</h2>

      {status === "scanning" && (
        <div id="qr-reader" style={{ width: "300px", margin: "auto" }} />
      )}

      {status === "success" && (
        <p style={{ color: "green" }}>{message}</p>
      )}

      {status === "error" && (
        <p style={{ color: "red" }}>{message}</p>
      )}
    </div>
  );
}

export default ScanQR;