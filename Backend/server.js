import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import routes
import authRoutes from "./Routes/auth.js";
import orderRoutes from "./Routes/order.js";

// Create app

dotenv.config();
const app = express();

// Middleware

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://bookstoreweb-five.vercel.app",
    "https://bookstoreweb-43kxysloy-akash-ss-projects-e75bc09b.vercel.app" // <- current Vercel preview build
  ],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/order", orderRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("🛒 Bookstore API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
