import { useEffect, useState } from "react";
import API from "../services/api";
import CreatePost from "../components/CreatePost";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";
function Feed() {
  const [posts, setPosts] = useState([]);



  const fetchPosts = async () => {
  try {
    const res = await API.get("/posts/all");

    console.log(res.data);

    setPosts(res.data);
  } catch (err) {
    console.log(err);
  }
};
  useEffect(() => {
    fetchPosts();
  }, []);

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
