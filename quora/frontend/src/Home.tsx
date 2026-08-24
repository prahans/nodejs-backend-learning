import { useNavigate } from "react-router-dom";

const posts = [
  {
    id: crypto.randomUUID(),
    username: "apnacollege",
    content: "learn Restful api",
  },
  {
    id: crypto.randomUUID(),
    username: "shradha",
    content:
      "hard work is important for success. and read the documentation of restful api.",
  },
  {
    id: crypto.randomUUID(),
    username: "prahans",
    content: "i got my 1st internship on google company.",
  },
];

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Quora Posts</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <h3 className="user">{post.username}</h3>
          <h3 className="content">{post.content}</h3>
          <a href="http://localhost:8080/posts/<%= post.id %>">
            see in details
          </a>
          <button onClick={() => navigate("/Edit")}>edit</button>
          <form method="post" action="/posts/<%= post.id %>?_method=DELETE">
            <button>delete</button>
          </form>
        </div>
      ))}
      <br />
      <br />
      <br />
      <a href="http://localhost:8080/posts/new">create a new post</a>
    </>
  );
}

export default Home;
