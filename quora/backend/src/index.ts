import express, { type Express, type Request, type Response } from "express";
import cors from "cors";

import connectDB from "./config/db.ts";
import Post from "./models/posts.ts";

const app: Express = express();

app.use(express.json());
app.use(cors());

const PORT = 3000;

app.get("/posts", async (req: Request, res: Response) => {
  const data = await Post.find();
  res.json(data);
});

app.post("/posts", async (req: Request, res: Response) => {
  const { username, content } = req.body;
  const data = await Post.create({
    username,
    content,
  });
  res.status(201).json(data);
});

// Added the forward slash right before :id
app.delete("/posts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("Deleting post with ID:", id);

  try {
    // 1. Delete the document from your MongoDB cluster via Mongoose
    const deletedPost = await Post.findByIdAndDelete(id);

    // 2. Check if the post actually existed
    if (!deletedPost) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    // 3. Return a successful 200 code along with the deleted object back to React
    res.status(200).json(deletedPost);
  } catch (error) {
    console.error("Database deletion error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
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
