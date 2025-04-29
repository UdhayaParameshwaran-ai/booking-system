//importing dependies
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
dotenv.config();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);

//Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => console.log("Server running"));
  })
  .catch((err) => console.log("MongoDB connection error", err));

// Folder Structure:
// /controllers
//     - authController.js
//     - serviceController.js
//     - bookingController.js
//     - adminController.js
// /models
//     - User.js
//     - Service.js
//     - Booking.js
// /routes
//     - authRoutes.js
//     - serviceRoutes.js
//     - bookingRoutes.js
//     - adminRoutes.js
// /middleware
//     - authMiddleware.js
// /utils
//     - bookingUtils.js
// .env
// package.json
// server.js
