import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Layout = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  const location = useLocation();

 
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("posts")) || [];
    setBlogs(storedBlogs);
    setFilteredBlogs(storedBlogs);
  }, []);

  return (
    <div>
      <Navbar blogs={blogs} setFilteredBlogs={setFilteredBlogs} />
      <Outlet context={{ blogs, filteredBlogs, setFilteredBlogs }} />
    
      {location.pathname !== "/create" && <Footer />}
    </div>
  );
};

export default Layout;