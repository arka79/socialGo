import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";
function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
 
  const fetchPosts = async () => {
    try {
      const res = await API.get("/posts/all");
      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
 
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchPosts();
    }
  }, [navigate]);
 
  return (
    <>
      <Navbar />
 
      <div className="feed-container">
        <CreatePost refreshPosts={fetchPosts} />
 
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            refreshPosts={fetchPosts}
          />
        ))}
      </div>
    </>
  );
}
 
export default Feed;
