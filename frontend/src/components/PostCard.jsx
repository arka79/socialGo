import API from "../services/api";
import { Link } from "react-router-dom";

function PostCard({
  post,
  refreshPosts,
}) {
  const handleLike = async (e) => {
    if (e) e.preventDefault();
    try {
      await API.post(
        `/posts/like/${post._id}`
      );

      if (refreshPosts) {
        refreshPosts();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isLiked = post.likes?.includes(currentUser?.username);

  return (
    <div className="post-card">
      <div className="post-header" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        marginBottom: '15px', 
        gap: '12px' 
      }}>
        <div className="post-avatar" style={{ 
          width: '45px', 
          height: '45px', 
          borderRadius: '50%', 
          backgroundColor: '#e1306c', 
          color: 'white', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          fontSize: '1.2rem', 
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {post.username?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <h3 className="post-username" style={{ 
          margin: 0, 
          fontSize: '1.1rem', 
          color: '#333', 
          fontWeight: '600',
          fontFamily: 'system-ui, -apple-system, sans-serif'
        }}>{post.username}</h3>
      </div>
 
      <p className="post-text" style={{ 
        fontSize: '1.1rem', 
        lineHeight: '1.6', 
        color: '#2c3e50', 
        marginBottom: '20px',
        fontWeight: '500',
        fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
        letterSpacing: '0.3px',
        textShadow: '0.5px 0.5px 0px rgba(0,0,0,0.05)',
        paddingLeft: '10px',
        margin: '0 0 20px 10px',
        textAlign: 'left'
      }}>
        {post.text}
      </p>

      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="post-image"
        />
      )}

      <div className="post-actions" style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        padding: '20px 0', 
        borderTop: '1px solid #eee',
        alignItems: 'center',
        userSelect: 'none'
      }}>
         <div className="action-item" onClick={(e) => handleLike(e)} style={{ 
           cursor: 'pointer', 
           display: 'flex', 
           alignItems: 'center', 
           gap: '8px', 
           fontSize: '1.2rem',
           WebkitTapHighlightColor: 'transparent'
         }}>
          <span className={`action-icon ${isLiked ? 'liked' : ''}`} style={{ fontSize: '1.5rem' }}>
            {isLiked ? '❤️' : '🤍'}
          </span>
          <span className="action-count" style={{ fontWeight: 'bold' }}>{post.likes?.length || 0}</span>
        </div>
 
        <Link to={`/posts/${post._id}/comments`} className="action-item" style={{ 
          cursor: 'pointer', 
          textDecoration: 'none', 
          color: 'inherit', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '8px', 
          fontSize: '1.2rem',
          WebkitTapHighlightColor: 'transparent'
        }}>
          <span className="action-icon" style={{ fontSize: '1.5rem' }}>💬</span>
          <span className="action-count" style={{ fontWeight: 'bold' }}>{post.comments?.length || 0}</span>
        </Link>
      </div>
 
      </div>
  );
}

export default PostCard;
