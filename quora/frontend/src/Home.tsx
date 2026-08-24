import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Post = {
  _id: string;
  username: string;
  content: string;
};

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Declare an isolated async function inside the effect
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Post[]>("http://localhost:3000/posts");
        setPosts(res.data);
      } catch (err) {
        setError("Failed to load posts. Please try again later.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading posts...</div>;
  if (error) return <div>{error}</div>;
  return (
    <>
      <h1>Quora Posts</h1>
      {posts.map((post) => (
        <div className="post" key={post._id}>
          <h3 className="user">@{post.username}</h3>
          <h3 className="content">{post.content}</h3>
          <button onClick={() => navigate("/show", { state: { post } })}>
            see in details
          </button>
          <button onClick={() => navigate("/Edit", { state: { post } })}>
            edit
          </button>
          <form method="post" action="/posts/<%= post.id %>?_method=DELETE">
            <button>delete</button>
          </form>
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
