import { useState } from "react";
import { useNavigate } from "react-router-dom";

const genres = [
  "Technology",
  "Travel",
  "Food",
  "Lifestyle",
  "Education",
  "Anime",
  "Books",
  "Movies",
  "Games",
  "Fitness",
  "Personal Development",
  "Health",
  "Finance",
  "Art",
  "Manhwa",
];

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [genre, setGenre] = useState("");

  const navigate = useNavigate(); 

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!title.trim() || !content.trim() || !genre) {
      alert("Please fill in all fields!");
      return;
    }
  
    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      genre,
      image,
      likes: 0,
      comments: [],
    };
  
    // Save to localStorage
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = [newPost, ...savedPosts];
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  
    // Clear form
    setTitle("");
    setContent("");
    setGenre("");
    setImage("");
  
    // Navigate and pass the updated posts to Home
    navigate("/", { state: { updatedPosts } });
  };
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          width: "400px",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", color: "#333" }}>Create a New Post</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            marginTop: "20px",
          }}
        >
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "1rem",
            }}
          />

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              height: "100px",
              fontSize: "1rem",
            }}
          />

         
          <select
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            style={{
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "1rem",
            }}
          >
            <option value="">Select Genre</option>
            {genres.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>

      
          <input
            type="file"
            onChange={handleImageUpload}
            style={{
              padding: "10px",
              borderRadius: "5px",
            }}
          />

         
          {image && (
            <img
              src={image}
              alt="Preview"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            />
          )}

          <button
            type="submit"
            style={{
              backgroundColor: "#3B82F6",
              color: "white",
              padding: "10px",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
