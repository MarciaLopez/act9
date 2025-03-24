const express = require("express");
const mongoose = require("mongoose");
const superheroRoutes = require("./routes/superheroRoutes");
const path = require("path");

require("dotenv").config();
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "public")));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/admin', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

app.get('/',(requestAnimationFrame,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

// Routes
app.use("/api/superheroes", require("./routes/superheroRoutes"));
// Root route to load the main index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
