import "./App.css";
import Navbar from "./components/nav/nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import NoPage from "./pages/nopage";
import { Container } from "@mui/material";
import CreatePost from "./components/UI/createPost";
import PostDetails from "./components/UI/post";
import About from "./pages/about";
import Contact from "./pages/contact";
import ClearedIssues from "./pages/clearIssues";
import Profile from "./pages/profile";
import SavedPost from "./pages/SavedPost";
import MyArticles from "./pages/yourArticle";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="lg">
        <Routes>
          <Route index element={<Home />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/post/:id" element={<PostDetails />} />
          <Route path="/saved" element={<SavedPost />} />
          <Route path="/articles" element={<MyArticles />} />

          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/clearedissues" element={<ClearedIssues />} />
          <Route path="/profile" element={<Profile />} />

          <Route path="*" element={<NoPage />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
