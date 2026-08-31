import "dotenv/config";
import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import postRouter from "./routes/postRoutes.ts";
import authRouter from "./routes/authRoutes.ts";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.ts";

const app: Express = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

const PORT = 3000;

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const startServer = async () => {
  try {
    // 1. Connect to MongoDB first
    await connectDB();

    // 3. Start the server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
