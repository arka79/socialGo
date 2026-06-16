import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";
function Feed() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
 
  const fetchPosts = async (pageNum = 1, silent = false) => {
    if (!silent) setLoading(true);
    try {
      const res = await API.get(`/posts/all?page=${pageNum}&limit=10`);
      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
      setPage(pageNum);
    } catch (err) {
      console.log(err);
    } finally {
      if (!silent) setLoading(false);
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
        <CreatePost refreshPosts={() => fetchPosts(1)} />
 
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading posts...</p>
        ) : (
          posts.map((post) => (
             <PostCard
               key={post._id}
               post={post}
               refreshPosts={() => fetchPosts(page, true)}
             />
          ))
        )}
 
        <div className="pagination-controls" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '15px', 
          margin: '30px 0',
          fontFamily: 'sans-serif'
        }}>
          <button 
            disabled={page === 1 || loading} 
            onClick={() => fetchPosts(page - 1)}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '20px', 
              cursor: 'pointer',
              border: '1px solid #ddd',
              backgroundColor: page === 1 ? '#eee' : 'white'
            }}
          >
            Previous
          </button>
          <span style={{ fontWeight: '600' }}>Page {page} of {totalPages}</span>
          <button 
            disabled={page === totalPages || loading} 
            onClick={() => fetchPosts(page + 1)}
            style={{ 
              padding: '8px 16px', 
              borderRadius: '20px', 
              cursor: 'pointer',
              border: '1px solid #ddd',
              backgroundColor: page === totalPages ? '#eee' : 'white'
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
 
export default Feed;
