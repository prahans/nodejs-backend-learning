import { useNavigate } from "react-router-dom";

function New() {
  const navigate = useNavigate();
  return (
    <>
      <form method="post" action="/posts">
        <input placeholder="enter username" name="username" type="text" />{" "}
        <br /> <br />
        <textarea placeholder="write you post" name="content"></textarea>
        <br />
        <button>submit post</button>
      </form>
      <button onClick={() => navigate(-1)}>go back</button>
    </>
  );
}

export default New;
