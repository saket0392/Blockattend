const express = require('express');
const cors = require('cors');
const connectDb = require("./config/db");
const app = express();

connectDb();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
   res.send("Blockattend Backend Running");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

