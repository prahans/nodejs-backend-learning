import { useLocation, useNavigate } from "react-router-dom";

type PostProps = {
  _id: string;
  username: string;
  content: string;
};

function Edit() {
  const location = useLocation();
  // Cast the state to your custom type safely
  const state = location.state as { post: PostProps } | null;
  const post = state?.post;
  const navigate = useNavigate();
  return (
    <>
      <h2>Edit your post</h2>
      <p>username : @{post?.username}</p>
      <p>post id : {post?._id}</p>
      <form method="post" action="/posts/<%= post.id %>?_method=PATCH">
        <textarea
          rows={10}
          cols={35}
          name="content"
          defaultValue={post?.content}
        ></textarea>
        <button>submit</button>
      </form>
      <button onClick={() => navigate(-1)}>back</button>
    </>
  );
}

export default Edit;
