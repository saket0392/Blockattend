const express = require("express");
const cors = require("cors");
const connectDb = require("./config/db");
const app = express();
const sessionRoutes = require("./routes/sessionRoutes");
const attendanceRoutes = require("./routes/attendanceRoutes");
const studentRoutes = require("./routes/studentRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

connectDb();

app.use(cors());
app.use(express.json());
app.use("/api/analytics", analyticsRoutes);
app.use("/api/session", sessionRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get("/", (req, res) => {
  res.send("Blockattend Backend Running");
});
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
