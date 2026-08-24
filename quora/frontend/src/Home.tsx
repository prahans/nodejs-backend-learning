import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Posts = {
  _id: string;
  username: string;
  content: string;
};

function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Posts[]>([]);
  useEffect(() => {
    axios.get("http://localhost:3000/posts").then((res) => {
      setPosts(res.data);
    });
  }, []);
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
