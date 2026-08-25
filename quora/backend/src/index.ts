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

// Using PUT or PATCH for modifications (e.g., /posts/:id)
app.put("/posts/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { username, content } = req.body; // Extract fields coming from React

  console.log("Updating post with ID:", id);

  try {
    // 1. Update the document.
    // { new: true } returns the fresh, updated object back instead of the old one.
    // { runValidators: true } ensures the new updates follow your Mongoose schema rules.
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { username, content },
      { new: true, runValidators: true },
    );

    // 2. Check if the post existed
    if (!updatedPost) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    // 3. Send the updated post back to React so it can refresh the UI state
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Database update error:", error);
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
