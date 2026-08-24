import mongoose, { Schema } from "mongoose";

interface Posts {
  username: string;
  content: string;
}

const userSchema = new Schema<Posts>({
  username: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const Post = mongoose.model<Posts>("Post", userSchema);

export default Post;
