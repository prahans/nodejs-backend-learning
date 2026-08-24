function New() {
  return (
    <form method="post" action="/posts">
      <input placeholder="enter username" name="username" type="text" /> <br />{" "}
      <br />
      <textarea placeholder="write you post" name="content"></textarea>
      <br />
      <button>submit post</button>
    </form>
  );
}

export default New;
