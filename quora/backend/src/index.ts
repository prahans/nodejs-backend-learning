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

const startServer = async () => {
  try {
    // 1. Connect to MongoDB first
    await connectDB();

    // 2. Create and save the document
    // const post = await Post.create(
    //   {
    //     username: "Prahans",
    //     content: "Hello world",
    //   },
    //   {
    //     username: "apnacollege",
    //     content: "learn Restful api",
    //   },
    //   {
    //     username: "shradha",
    //     content:
    //       "hard work is important for success. and read the documentation of restful api.",
    //   },
    //   {
    //     username: "prahans",
    //     content: "i got my 1st internship on xyz company.",
    //   },
    // );

    // console.log(post);

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
