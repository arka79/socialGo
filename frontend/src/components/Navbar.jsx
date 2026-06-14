import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/feed" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h2 className="logo">Social Go</h2>
        </Link>
      </div>


      <div className="navbar-right">
        <div className="navbar-user-actions">
          <Link to="/profile" className="profile-avatar" style={{ textDecoration: 'none' }}>
            {user?.username?.charAt(0)?.toUpperCase() || "U"}
          </Link>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
