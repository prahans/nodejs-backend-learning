import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  // 1. Set up local state to capture input values
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [isLogging, setIsLogging] = useState(false);

  // 2. Handle the submission event asynchronously
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents HTML from trying to reload/redirect the entire page

    if (!username.trim() || !password.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      setIsLogging(true);

      // 3. Make the POST network request directly to your Express API
      await axios.post("http://localhost:3000/login", {
        username: username,
        password: password,
      });

      // 4. Redirect the user back to the feed page after success
      navigate("/");
    } catch (error) {
      console.error("incorrect username and password :", error);
      alert("Failed to login. Check your username and password");
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <>
      {/* Attach the custom submit handler here */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">enter your username</label>
        <input
          id="username"
          name="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br /> <br />
        <label htmlFor="password">enter your password</label>
        <input
          id="password"
          name="password"
          typeof="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        ></input>
        <br />
        <button type="submit" disabled={isLogging}>
          {isLogging ? " Logging..." : "login"}
        </button>
      </form>

      <br></br>
      <br></br>
      <br></br>
      <button onClick={() => navigate(-1)} disabled={isLogging}>
        go back
      </button>
    </>
  );
}

export default Login;
