import "./App.css";
import Navbar from "./components/nav/nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home/home";
import NoPage from "./home/nopage";
import { Container } from "@mui/material";
import CreatePost from "./components/UI/createPost";
import PostDetails from "./components/UI/post";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container maxWidth="lg">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<PostDetails />}/>
            <Route path="*" element={<NoPage />} />
          </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
