import { useState } from "react";
import API from "../services/api";

function CommentModal({
  post,
  refreshPosts,
}) {
  const [comment, setComment] =
    useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleComment = async () => {
    if (!comment.trim()) return;

    try {
      await API.post(
        `/posts/comment/${post._id}`,
        {
          text: comment,
        }
      );

      setComment("");
      setIsExpanded(false);

      refreshPosts();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="comment-section">
      <div 
        className="comment-trigger-btn" 
        onClick={() => setIsExpanded(!isExpanded)}
      >
        💬 View {post.comments?.length || 0} comments
      </div>

      {isExpanded && (
        <div className="comment-box">
          <div className="comment-input-group">
            <input
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) =>
                setComment(e.target.value)
              }
            />
            <button onClick={handleComment}>Post</button>
          </div>

          <div className="comment-list">
            {post.comments?.map(
              (comment, index) => (
                <div key={index} className="comment-item" style={{ marginBottom: '10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <strong className="comment-user" style={{ color: '#333', fontSize: '0.9rem' }}>
                    {comment.username}
                  </strong>
                  <span className="comment-text" style={{ 
                    fontWeight: '800', 
                    fontSize: '1.5rem', 
                    color: 'inherit',
                    color: '#1a252f',
                    lineHeight: '1.4',
                    fontFamily: '"Segoe UI", Roboto, sans-serif'
                  }}>
                    {comment.text}
                  </span>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentModal;