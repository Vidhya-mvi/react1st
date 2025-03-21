import { Link } from "react-router-dom";
import { useState } from "react";


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

const PostCard = ({ post, onDelete, index }) => {
  const isHidden = index >= 3;

 
  const [likes, setLikes] = useState(post.likes || 0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const [showAllComments, setShowAllComments] = useState(false);

  const updatePost = (updatedPost) => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = savedPosts.map((p) => (p.id === post.id ? updatedPost : p));
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

 
  const handleLike = () => {
    const newLikes = likes + 1;
    setLikes(newLikes);
    updatePost({ ...post, likes: newLikes });
  };

 
  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() !== "") {
      const newComments = [...comments, comment.trim()];
      setComments(newComments);
      setComment("");
      updatePost({ ...post, comments: newComments });
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#fff",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "16px",
        position: "relative",
        width: "300px",
        margin: "0 auto",
        transition: "transform 0.2s ease-in-out",
      }}
      onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
    
      {post.image && (
        <img
          src={post.image}
          alt="Post"
          style={{
            width: "100%",
            height: "400px",
            objectFit: "cover",
            borderRadius: "8px 8px 0 0",
            marginBottom: "8px",
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
            marginBottom: "8px",
            textAlign: "center",
          }}
        >
          {post.genre}
        </span>
      )}

      <h2
        style={{
          fontSize: "1.25rem",
          fontWeight: "600",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        {post.title}
      </h2>

    
      {!isHidden && (
        <p style={{ color: "#4B5563", marginBottom: "8px", textAlign: "center" }}>
          {post.content.substring(0, 100)}...
        </p>
      )}

     
      <Link
        to={`/post/${post.id}`}
        style={{
          color: "#3B82F6",
          fontWeight: "500",
          textDecoration: "none",
          display: "block",
          textAlign: "center",
          marginBottom: "8px",
        }}
      >
        Read More →
      </Link>

   
      <div style={{ textAlign: "center", marginBottom: "10px", color: "#555" }}>
         {likes} {likes === 1 ? "like" : "likes"}
        <button
          onClick={handleLike}
          style={{
            marginLeft: "8px",
            backgroundColor: "#FF4D4D",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
           Like
        </button>
      </div>

    
      <div style={{ marginTop: "10px", borderTop: "1px solid #ddd", paddingTop: "10px" }}>
        <h4 style={{ fontSize: "1rem", marginBottom: "5px", textAlign: "center" }}>Comments</h4>

        <form onSubmit={handleCommentSubmit} style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            style={{ padding: "6px", borderRadius: "5px", border: "1px solid #ddd", width: "70%" }}
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
          <>
            {showAllComments
              ? comments.map((c, i) => (
                  <p key={i} style={{ fontSize: "0.9rem", color: "#4B5563", marginTop: "5px", textAlign: "center" }}>
                     {c}
                  </p>
                ))
              : `${comments.length} comments — `}
            {comments.length > 2 && (
              <span
                style={{ color: "#3B82F6", cursor: "pointer" }}
                onClick={() => setShowAllComments(!showAllComments)}
              >
                {showAllComments ? "Hide" : "Show all"}
              </span>
            )}
          </>
        ) : (
          <p style={{ fontSize: "0.8rem", color: "#aaa", textAlign: "center" }}>No comments yet.</p>
        )}
      </div>

     
      <button
        onClick={onDelete}
        style={{
          position: "absolute",
          top: "8px",
          right: "8px",
          backgroundColor: "#FF4D4D",
          color: "#fff",
          border: "none",
          padding: "5px 10px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        X
      </button>
    </div>
  );
};

export default PostCard;