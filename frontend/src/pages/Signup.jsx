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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.username || !form.email || !form.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await API.post("/auth/signup", form);
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Signup failed. Please try again.");
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

        <button type="submit">
          Signup
        </button>
      </form>
      <Link to="/login">Already have an account? Login</Link>
    </div>
    </>
  );
}

          

         



export default Signup;