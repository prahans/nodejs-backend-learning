import express from "express";
import connectDB from "./config/db.ts";

const app = express();

app.use(express.json());

const PORT = 3000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
