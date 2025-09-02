const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// In-memory storage (replace with DB later)
let newsletterSubscribers = [];
let contactMessages = [];

// Newsletter endpoint
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }
  newsletterSubscribers.push({ email, date: new Date() });
  console.log("New newsletter subscriber:", email);
  res.json({ success: true, message: "Subscribed successfully" });
});

// Contact endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  contactMessages.push({ name, email, message, date: new Date() });
  console.log("New contact message:", { name, email, message });
  res.json({ success: true, message: "Message received" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
