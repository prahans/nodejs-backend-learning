import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import postRouter from "./routes/postRoutes.ts";

import connectDB from "./config/db.ts";

const app: Express = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.use("/api/posts", postRouter);

app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log(username, password);
  // const data = await Post.find();
  res.status(201).send(`welcome ${username}`);
  // res.redirect("/");
  // res.send("hello world")
});

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
