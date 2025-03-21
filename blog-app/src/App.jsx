import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/CreatePost";
import PostDetails from "./pages/PostDetail";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Layout />}
        >
          <Route index element={<Home />} />
          <Route path="create" element={<Create />} />
          <Route path="post/:id" element={<PostDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;