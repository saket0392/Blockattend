import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { generateQRPayload } from "../../utils/qrPayload";
import "../../styles/attendance.css";

function GenerateQR() {
  const [qrData, setQrData] = useState("");

  useEffect(() => {
    generateQR();

    const interval = setInterval(generateQR, 10000);
    return () => clearInterval(interval);
  }, []);

  const generateQR = () => {
    const payload = generateQRPayload({
      courseId: "CS301",
      facultyId: "FAC123",
    });
    setQrData(payload);
  };

  return (
    <div className="attendance-container">
      <h2>Generate Attendance QR</h2>

      {qrData && (
        <div className="qr-box">
          <QRCodeCanvas value={qrData} size={220} />
          <p>QR refreshes every 10 seconds</p>
          <p>QR valid for 3 minutes</p>
        </div>
      )}
    </div>
  );
}

export default GenerateQR;
