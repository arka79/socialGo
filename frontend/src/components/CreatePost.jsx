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
    <div className="create-post" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '15px',
      padding: '20px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    }}>
      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) =>
          setText(e.target.value)
        }
        style={{ 
          width: '100%', 
          padding: '10px', 
          borderRadius: '8px', 
          border: '1px solid #ddd',
          resize: 'none',
          fontSize: '1rem',
          fontFamily: 'inherit'
        }}
      />
 
      <div className="post-actions-row" style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        gap: '10px'
      }}>
        <div className="image-upload-container" style={{ display: 'flex', alignItems: 'center' }}>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])} 
            id="file-input"
            style={{ display: 'none' }}
          />
          <label htmlFor="file-input" className="upload-label" style={{ 
            cursor: 'pointer', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '5px',
            padding: '8px 12px',
            backgroundColor: '#f0f2f5',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: '#65676b',
            transition: 'background 0.2s'
          }}>
            <span style={{ fontSize: '1.2rem' }}>📷</span>
            {image ? `Selected` : "Add Image"}
          </label>
        </div>
 
        <button className="post-submit-btn" onClick={handlePost} style={{ 
          padding: '8px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '40px',
          width: '10rem' ,
          cursor: 'pointer', 
          fontWeight: '800',
          transition: 'background 0.2s',
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          fontSize: '1.4rem',
          justifyContent: 'center'
        }}>
          <span style={{ fontSize: '2rem' }}>🚀</span> Post
        </button>
      </div>
    </div>
  );
}

export default CreatePost;
