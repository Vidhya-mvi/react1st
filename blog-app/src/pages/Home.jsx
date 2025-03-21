import { useOutletContext } from "react-router-dom";
import PostCard from "../components/PostCard";

const Home = () => {
  const { filteredBlogs, setFilteredBlogs, blogs } = useOutletContext();

 
  const handleDelete = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    localStorage.setItem("posts", JSON.stringify(updatedBlogs));
    setFilteredBlogs(updatedBlogs);
  };

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center", padding: "20px" }}>
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((post, index) => (
            <PostCard key={post.id} post={post} onDelete={() => handleDelete(post.id)} index={index} />
          ))
        ) : (
          <p style={{ color: "#aaa", fontSize: "1.2rem", textAlign: "center" }}>No matching blogs found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;