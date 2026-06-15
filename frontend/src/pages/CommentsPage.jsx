import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function CommentsPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);
  const currentUser = JSON.parse(localStorage.getItem("user"));
 
  const fetchPost = useCallback(async () => {
    try {
      const res = await API.get(`/posts/${postId}`);
      setPost(res.data);
    } catch (err) {
      console.error("Error fetching post", err);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
 
    try {
      await API.post(`/posts/comment/${postId}`, {
        text: commentText,
      });
      setCommentText("");
      await fetchPost();
    } catch (err) {
      alert("Failed to post comment");
    }
  };
 
  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await API.delete(`/posts/comment/${postId}/${commentId}`);
      await fetchPost();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to delete comment");
    }
  };
 
  if (loading) return <div className="loading-screen">Loading...</div>;
  if (!post) return <div className="loading-screen">Post not found</div>;

  return (
    <div className="comments-page-container">
      <Navbar />
      <div className="comments-content">
        <div className="post-preview">
          <div className="post-header">
            <div className="post-avatar">
              {post.username?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <h3 className="post-username">{post.username}</h3>
          </div>
          <p className="post-text">{post.text}</p>
          {post.image && <img src={post.image} className="post-image" alt="post" />}
        </div>

        <div className="comments-section">
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Comments</h2>
          <form onSubmit={handlePostComment} className="comment-input-form">
            <input 
              placeholder="Add a comment..." 
              value={commentText} 
              onChange={(e) => setCommentText(e.target.value)} 
            />
            <button type="submit">Post</button>
          </form>

            <div className="comments-list">
              {post.comments?.map((c, i) => (
                <div key={i} className="comment-item" style={{ 
                  marginBottom: '15px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '4px',
                  position: 'relative'
                }}>
                  <div className="comment-user-info">
                    <strong className="comment-user" style={{ color: '#333', fontSize: '1rem' }}>{c.username}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="comment-text" style={{ 
                      color: '#1a252f', 
                      fontSize: '1.2rem', 
                      fontWeight: '700', 
                      lineHeight: '1.4',
                      fontFamily: '"Segoe UI", Roboto, sans-serif' 
                    }}>{c.text}</span>
                    
                    {currentUser?.username === c.username && (
                      <button 
                        onClick={() => handleDeleteComment(c._id)} 
                        style={{ 
                          border: 'none', 
                          background: 'none', 
                          color: 'red', 
                          cursor: 'pointer', 
                          fontSize: '0.8rem',
                          fontWeight: 'bold'
                        }}
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {post.comments?.length === 0 && <p className="no-comments">No comments yet. Be the first!</p>}
            </div>
        </div>
      </div>
    </div>
  );
}

export default CommentsPage;
