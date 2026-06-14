import API from "../services/api";
import { Link } from "react-router-dom";

function PostCard({
  post,
  refreshPosts,
}) {
  const handleLike = async () => {
    try {
      await API.post(
        `/posts/like/${post._id}`
      );

      refreshPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isLiked = post.likes?.includes(currentUser?.username);

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-avatar">
          {post.username?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <h3 className="post-username">{post.username}</h3>
      </div>

      <p className="post-text">{post.text}</p>

      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="post-image"
        />
      )}

      <div className="post-actions">
        <div className="action-item" onClick={handleLike} style={{ cursor: 'pointer' }}>
          <span className={`action-icon ${isLiked ? 'liked' : ''}`}>
            {isLiked ? '❤️' : '🤍'}
          </span>
          <span className="action-count">{post.likes?.length || 0}</span>
        </div>

        <Link to={`/posts/${post._id}/comments`} className="action-item" style={{ cursor: 'pointer', textDecoration: 'none', color: 'inherit' }}>
          <span className="action-icon">💬</span>
          <span className="action-count">{post.comments?.length || 0}</span>
        </Link>
      </div>
    </div>
  );
}

export default PostCard;
