import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";


const genreColors = {
  Technology: "#4CAF50",
  Travel: "#FF9800",
  Food: "#E91E63",
  Lifestyle: "#9C27B0",
  Education: "#2196F3",
  Anime: "#F44336",
  Books: "#795548",
  Movies: "#607D8B",
  Games: "#3F51B5",
  Fitness: "#8BC34A",
  Health: "#FF5722",
  Finance: "#00BCD4",
  Art: "#673AB7",
  Manhwa: "#FFB400",
  default: "#3B82F6",
};

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState(
    JSON.parse(localStorage.getItem("posts")) || []
  );

  const postIndex = posts.findIndex((p) => p.id === Number(id) || p.id === id);
  const post = posts[postIndex];

  
  const [likes, setLikes] = useState(post?.likes || 0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments || []);

  
  useEffect(() => {
    if (!post) {
      setTimeout(() => navigate("/"), 2000);
    }
  }, [post, navigate]);

  if (!post) {
    return (
      <h2 style={{ color: "red", textAlign: "center" }}>
        Post Not Found! Redirecting...
      </h2>
    );
  }

  
  const handleLike = () => {
    const updatedPosts = [...posts];
    updatedPosts[postIndex].likes = likes + 1;
    setLikes(likes + 1);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };


  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      const updatedComments = [...comments, comment];
      setComments(updatedComments);

      const updatedPosts = [...posts];
      updatedPosts[postIndex].comments = updatedComments;
      setPosts(updatedPosts);

      localStorage.setItem("posts", JSON.stringify(updatedPosts));
      setComment("");
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      
      const updatedPosts = posts.filter((p) => p.id !== post.id);
  
      
      setPosts(updatedPosts);
      localStorage.setItem("posts", JSON.stringify(updatedPosts));
  
    
      navigate("/");
    }
  };
  

  return (
    <div
      style={{
        border: "2px solid #ddd",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        maxWidth: "600px",
        margin: "0 auto",
        marginTop: "20px",
        textAlign: "center",
      }}
    >
      
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          style={{
            width: "100%",
            height: "auto",
            maxHeight: "400px",
            objectFit: "contain",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        />
      )}

     
      {post.genre && (
        <span
          style={{
            display: "inline-block",
            backgroundColor: genreColors[post.genre] || genreColors.default,
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "20px",
            fontSize: "0.8rem",
            fontWeight: "500",
            marginBottom: "10px",
          }}
        >
          {post.genre}
        </span>
      )}

     
      <h1 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px" }}>
        {post.title}
      </h1>

   
      <p style={{ fontSize: "1.2rem", color: "#444", lineHeight: "1.6", marginBottom: "20px" }}>
        {post.content}
      </p>

     
      <div style={{ marginBottom: "20px" }}>
        <button
          onClick={handleLike}
          style={{
            backgroundColor: "#FF4D4D",
            color: "#fff",
            border: "none",
            padding: "8px 16px",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
          }}
        >
          Like
        </button>
        <span style={{ fontSize: "1rem", color: "#555" }}>{likes} likes</span>
      </div>

      
      <div
        style={{
          marginTop: "20px",
          borderTop: "1px solid #ddd",
          paddingTop: "10px",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", marginBottom: "5px" }}>Comments</h3>

       
        <form
          onSubmit={handleCommentSubmit}
          style={{ display: "flex", justifyContent: "center", gap: "5px" }}
        >
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            style={{
              padding: "6px",
              borderRadius: "5px",
              border: "1px solid #ddd",
              width: "70%",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "#3B82F6",
              color: "#fff",
              border: "none",
              padding: "6px 10px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Post
          </button>
        </form>

       
        {comments.length > 0 ? (
          comments.map((c, i) => (
            <p key={i} style={{ fontSize: "0.9rem", color: "#4B5563", marginTop: "5px" }}>
              {c}
            </p>
          ))
        ) : (
          <p style={{ fontSize: "0.8rem", color: "#aaa" }}>No comments yet.</p>
        )}
      </div>

     
      <button
        onClick={() => navigate(-1)}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#4B5563",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        ← Back to Home
      </button>

     
      <button
        onClick={handleDelete}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#FF4D4D",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        🗑️ Delete Blog
      </button>
    </div>
  );
};

export default PostDetails;