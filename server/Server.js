const express = require('express');
const cors = require('cors');
const connectDb = require("./config/db");
const app = express();
const sessionRoutes = require("./routes/sessionRoutes")
connectDb();

app.use(cors());
app.use(express.json());
app.use("/api/session", sessionRoutes);
app.get('/', (req, res) => {
   res.send("Blockattend Backend Running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

