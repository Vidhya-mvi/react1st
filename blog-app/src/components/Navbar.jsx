import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = ({ blogs, setFilteredBlogs }) => {
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
  const popularGenres = ["Anime", "Books", "Food", "Movies", "Games", "Manhwa"];

  const [searchQuery, setSearchQuery] = useState("");
  const [showGenres, setShowGenres] = useState(false);

  const dropdownRef = useRef(null);


  const toggleGenres = () => setShowGenres(!showGenres);

  
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowGenres(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  
  const handleSearchInput = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const matches = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredBlogs(matches);
    } else {
      setFilteredBlogs(blogs); 
    }
  };

  
  const handleGenreClick = (genre) => {
    const genreMatches = blogs.filter((blog) =>
      blog.genre?.toLowerCase().includes(genre.toLowerCase())
    );
    setFilteredBlogs(genreMatches);
    setShowGenres(false);
  };

  return (
    <nav
      style={{
        backgroundColor: "#2E2E2E",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "#fff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
     
      <div style={{ position: "relative" }} ref={dropdownRef}>
        <div
          onClick={toggleGenres}
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          <div style={{ width: "20px", height: "2px", backgroundColor: "#fff" }}></div>
          <div style={{ width: "20px", height: "2px", backgroundColor: "#fff" }}></div>
          <div style={{ width: "20px", height: "2px", backgroundColor: "#fff" }}></div>
        </div>

        
        {showGenres && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              backgroundColor: "#fff",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
              borderRadius: "5px",
              padding: "10px",
              minWidth: "180px",
              zIndex: 10,
              opacity: showGenres ? 1 : 0,
              transform: showGenres ? "translateY(0)" : "translateY(-10px)",
              transition: "opacity 0.3s ease, transform 0.3s ease",
            }}
          >
            <div
              style={{
                marginBottom: "10px",
                fontSize: "0.9rem",
                fontWeight: "bold",
                color: "#333",
                borderBottom: "1px solid #ddd",
                paddingBottom: "5px",
              }}
            >
              Popular Genres
            </div>
            {popularGenres.map((genre) => (
              <div
                key={genre}
                onClick={() => handleGenreClick(genre)}
                style={{
                  display: "block",
                  color: "#333",
                  cursor: "pointer",
                  padding: "5px 0",
                  fontWeight: "500",
                }}
              >
                {genre}
              </div>
            ))}

            <div
              style={{
                marginTop: "10px",
                fontSize: "0.9rem",
                fontWeight: "bold",
                color: "#333",
                borderTop: "1px solid #ddd",
                paddingTop: "5px",
              }}
            >
              All Genres
            </div>
            {genres.map((genre) =>
              !popularGenres.includes(genre) ? (
                <div
                  key={genre}
                  onClick={() => handleGenreClick(genre)}
                  style={{
                    display: "block",
                    color: "#333",
                    cursor: "pointer",
                    padding: "5px 0",
                    fontWeight: "500",
                  }}
                >
                  {genre}
                </div>
              ) : null
            )}
          </div>
        )}
      </div>

      
      <Link
        to="/"
        style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#fff", textDecoration: "none" }}
      >
        My Blog
      </Link>

     
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={handleSearchInput}
          style={{
            padding: "8px",
            borderRadius: "5px",
            border: "none",
            width: "200px",
            maxWidth: "100%",
          }}
        />
        {searchQuery && (
          <span
            onClick={() => {
              setSearchQuery("");
              setFilteredBlogs(blogs);
            }}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "#999",
            }}
          >
            ✖
          </span>
        )}
      </div>

      <Link
        to="/create"
        style={{
          backgroundColor: "#3B82F6",
          color: "#fff",
          padding: "8px 12px",
          borderRadius: "5px",
          textDecoration: "none",
          fontWeight: "500",
        }}
      >
        Create Blog
      </Link>
    </nav>
  );
};

export default Navbar;