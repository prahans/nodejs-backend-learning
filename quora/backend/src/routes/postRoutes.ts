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
  try {
    const { id } = req.params;
    const { content } = req.body;

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
        message: "You are not allowed to edit this post",
      });

      return;
    }

    post.content = content;

    const updatedPost = await post.save();

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.error("Update post error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default router;
