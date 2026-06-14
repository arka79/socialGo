import { useState } from "react";
import API from "../services/api";

function CreatePost({ refreshPosts }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handlePost = async () => {
    if (!text && !image) {
      alert("Enter text or select an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("text", text);
      if (image) {
        formData.append("image", image);
      }

      await API.post("/posts/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setText("");
      setImage(null);

      refreshPosts();
    } catch (err) {
      alert("Post Failed");
    }
  };

  return (
    <div className="create-post">
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
      />

      <div className="image-upload-container">
        <input 
          type="file" 
          accept="image/*" 
          onChange={(e) => setImage(e.target.files[0])} 
          id="file-input"
          style={{ display: 'none' }}
        />
        <label htmlFor="file-input" className="upload-label">
          {image ? `Selected: ${image.name}` : "📷 Choose Image"}
        </label>
      </div>

      <button className="post-submit-btn" onClick={handlePost}>
        Post
      </button>
    </div>
  );
}

export default CreatePost;
