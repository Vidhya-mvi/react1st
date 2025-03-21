import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#2E2E2E",
        color: "#fff",
        padding: "20px 0",
        textAlign: "center",
        fontSize: "0.9rem",
        position: "relative",
        bottom: 0,
        width: "100%",
        boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.3)",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <a
          href="/about"
          style={{ color: "#3B82F6", textDecoration: "none", margin: "0 10px" }}
        >
          About
        </a>
        <a
          href="/contact"
          style={{ color: "#3B82F6", textDecoration: "none", margin: "0 10px" }}
        >
          Contact
        </a>
        <a
          href="/privacy"
          style={{ color: "#3B82F6", textDecoration: "none", margin: "0 10px" }}
        >
          Privacy Policy
        </a>
      </div>
      <div>&copy; {new Date().getFullYear()} My Blog. All rights reserved.</div>
    </footer>
  );
};



export default Footer;