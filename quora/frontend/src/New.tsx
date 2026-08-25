import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function New() {
  const navigate = useNavigate();

  // 1. Set up local state to capture input values
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 2. Handle the submission event asynchronously
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents HTML from trying to reload/redirect the entire page

    if (!username.trim() || !content.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 3. Make the POST network request directly to your Express API
      await axios.post("http://localhost:3000/posts", {
        username: username,
        content: content,
      });

      // 4. Redirect the user back to the feed page after success
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to submit post. Check if your server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Attach the custom submit handler here */}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="enter username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /> <br />
        <textarea
          placeholder="write your post"
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "submitting..." : "submit post"}
        </button>
      </form>

      <button onClick={() => navigate(-1)} disabled={isSubmitting}>
        go back
      </button>
    </>
  );
}

export default New;
