import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function CommentsPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(true);

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
              <div key={i} className="comment-item">
                <div className="comment-user-info">
                  <strong className="comment-user">{c.username} : </strong>
                  <span className="comment-text">{c.text}</span>
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
