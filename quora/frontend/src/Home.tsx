import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

type Post = {
  _id: string;
  username: string;
  content: string;
};

function Home() {
  const navigate = useNavigate();

  // 1. Manage the list of posts in local state
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:3000/posts");
      setPosts(res.data);
    };
    fetchPosts();
  }, []);

  // 2. The Delete Handler
  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      // Send the delete request to the backend database
      await axios.delete(`http://localhost:3000/posts/${id}`);

      // 🔥 REFRESH EFFECT: Filter out the deleted post from state.
      // React sees the state change and instantly re-renders the feed!
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Error deleting post. Make sure your server is online.");
    }
  };
  return (
    <>
      <h1>Quora Posts</h1>
      {posts?.map((post) => (
        <div className="post" key={post._id}>
          <h3 className="user">@{post.username}</h3>
          <h3 className="content">{post.content}</h3>
          <button onClick={() => navigate("/show", { state: { post } })}>
            see in details
          </button>
          <button onClick={() => navigate("/Edit", { state: { post } })}>
            edit
          </button>
          <button
            onClick={() => handleDelete(post._id)}
            style={{ color: "red", cursor: "pointer" }}
          >
            delete
          </button>
        </div>
      ))}
      <br />
      <br />
      <br />
      <button onClick={() => navigate("/new")}>create a new post</button>
    </>
  );
}

export default Home;
