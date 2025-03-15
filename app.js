require("dotenv").config();
const path = require('path');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
