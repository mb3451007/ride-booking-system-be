const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
  
// Routes
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/driverRoutes"));
app.use("/api", require("./routes/vehicleRoutes"));
app.use("/api", require("./routes/packageRoutes"));
app.use("/api", require("./routes/surchargeRoutes"));
app.use("/api", require("./routes/discountRoutes"));
app.use("/api", require("./routes/bookingRoutes"));
app.use("/api", require("./routes/emailRoutes"));
app.use("/api", require("./routes/paymentRoutes"));

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
