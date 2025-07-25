const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
require("dotenv").config();

const Request = require("./schema");

const app = express();
const PORT = process.env.PORT || 4000;

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.post("/submit-request", upload.array("files"), async (req, res) => {
  try {
    const { name, address, service, notes } = req.body;
    const files = req.files.map(file => file.originalname);
    const saved = await Request.create({ name, address, service, notes, files });
    res.status(200).json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
