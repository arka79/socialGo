import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (!storedUser) {
          navigate("/");
          return;
        }
        setUser(storedUser);

        const res = await API.get("/posts/all");
        const userPosts = res.data.filter(post => post.userId === storedUser._id || post.username === storedUser.username);
        setPosts(userPosts);
      } catch (err) {
        console.error("Error fetching profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [navigate]);

  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="profile-page-container">
      <Navbar />
      <div className="profile-content">
        <div className="profile-header">
          <div className="profile-main-avatar">
            {user.username?.charAt(0)?.toUpperCase() || "U"}
          </div>
          <div className="profile-info">
            <h2>{user.username}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <strong>{posts.length}</strong>
            <span>Posts</span>
          </div>
        </div>

        <div className="profile-posts-grid">
          {posts.map(post => (
            <div key={post._id} className="profile-post-item">
              {post.image ? (
                <img src={post.image} alt="post" />
              ) : (
                <div className="text-post-placeholder">{post.text.substring(0, 50)}...</div>
              )}
            </div>
          ))}
          {posts.length === 0 && <p className="no-posts">You haven't posted anything yet.</p>}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
