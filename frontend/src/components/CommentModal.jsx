import { useState } from "react";
import API from "../services/api";

function CommentSection({
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
                <div key={index} className="comment-item">
                  <strong className="comment-user">
                    {comment.username}
                  </strong>
                  <span className="comment-text">: {comment.text}</span>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CommentSection;