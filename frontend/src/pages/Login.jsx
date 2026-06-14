import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
 
    if (!email || !password) {
      setError("Please fill in both email and password");
      return;
    }
 
    setIsLoading(true);
    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });
 
      localStorage.setItem("token", res.data.token);
 
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );
 
      navigate("/feed");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="auth-container">
      <h2>Login</h2>
 
      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          type="email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />
 
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
 
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
 
      {error && <p className="error-message" style={{ color: "red", marginTop: "10px", textAlign: "center" }}>{error}</p>}
 
      <Link to="/">
        Create Account
      </Link>
    </div>
  );
}

export default Login;