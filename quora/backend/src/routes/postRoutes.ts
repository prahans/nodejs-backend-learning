import { Router } from "express";
import { type Request, type Response } from "express";
import Post from "../models/posts.ts";
import { userVerification } from "../middlewares/authMiddleware.ts";

const router = Router();

router.get("/", userVerification, async (req: Request, res: Response) => {
  const data = await Post.find();
  res.json(data);
});

router.post("/", userVerification, async (req: Request, res: Response) => {
  const { content } = req.body;

  const post = await Post.create({
    author: req.user!._id,
    username: req.user!.username,
    content,
  });

  res.status(201).json(post);
});

router.delete("/:id", userVerification, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      res.status(404).json({
        success: false,
        message: "Post not found",
      });

      return;
    }

    // Check ownership
    if (post.author.toString() !== req.user!._id.toString()) {
      res.status(403).json({
        success: false,
        message: "You are not allowed to delete this post",
      });

      return;
    }

    await Post.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Using PUT or PATCH for modifications (e.g., /posts/:id)
router.put("/:id", userVerification, async (req: Request, res: Response) => {
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

export default router;
