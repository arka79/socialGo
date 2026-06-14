import { useState } from "react";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
 
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
 
    if (!form.username || !form.email || !form.password) {
      setError("Please fill in all fields");
      return;
    }
 
    setIsLoading(true);
    try {
      await API.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.error || "Signup failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <>
    <div className="auth-container">
      <h2>Create Account</h2>
 
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          required
          onChange={(e) =>
            setForm({ ...form, username: e.target.value })
          }
        />
 
        <input
          placeholder="Email"
          type="email"
          required
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />
 
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />
 
        <button type="submit" disabled={isLoading} style={{ 
          userSelect: 'none', 
          WebkitTapHighlightColor: 'transparent',
          cursor: 'pointer' 
        }}>
          {isLoading ? "Signing up..." : "Signup"}
        </button>
      </form>
      {error && <p className="error-message" style={{ color: "red", marginTop: "10px", textAlign: "center" }}>{error}</p>}
      <Link to="/login">Already have an account? Login</Link>
    </div>
    </>
  );
}

          

         



export default Signup;