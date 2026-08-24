import { useNavigate } from "react-router-dom";

function Edit() {
  const navigate = useNavigate();
  return (
    <>
      <h2>Edit your post</h2>
      <p>username : @</p>
      <p>post id : </p>
      <form method="post" action="/posts/<%= post.id %>?_method=PATCH">
        <textarea rows={10} cols={35} name="content"></textarea>
        <button>submit</button>
      </form>
      <button onClick={() => navigate(-1)}>back</button>
    </>
  );
}

export default Edit;
