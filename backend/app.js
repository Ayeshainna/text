
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import incomeRoutes from "./routes/incomeRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
dotenv.config();

/* ✅ __dirname fix for ES modules */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();

/* ✅ 1. Fix CORS configuration for Vercel */
const allowedOrigins = [
  "http://localhost:5173",
  "https://expense-tracker-inna.netlify.app",
];

// Use a stable and permissive config (no “Error: Not allowed by CORS” thrown — that breaks preflight on Vercel)
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      // Instead of throwing an Error (which kills the response)
      // just reject by not adding CORS headers
      return callback(null, false);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // ✅ allows cookies/tokens in headers
  })
);

/* ✅ 2. Explicitly handle OPTIONS preflight requests */
app.options("*", cors()); // ensures all routes respond to preflight checks

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ✅ 3. Simple health routes for monitoring */
app.get("/", (req, res) => {
  res.send("Welcome to my expense-tracker");
});

app.get("/health", (req, res) => {
  res.send("Success");
});

/* ✅ 4. API routes */
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);
app.use("/api/v1/expense", expenseRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);

/* ✅ 5. Serve uploads safely (static) */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ✅ 6. Start server */
// async function start() {
//   try {
//     console.log("🌐 Connecting to MongoDB…");
//     await connectDB();
//     console.log("✅ MongoDB connected");

//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error("❌ Failed to connect to MongoDB:", err);
//     process.exit(1);
//   }
// }

/* ✅ Connect to DB once (not inside app.listen) */
connectDB()
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });

/* ✅ Export app instead of app.listen() */
// export default app;

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
