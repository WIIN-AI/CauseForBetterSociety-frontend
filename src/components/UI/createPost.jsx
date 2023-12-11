import { Box, Container, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [story, setStory] = useState("");

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  function onImageChange(e) {
    setImage(e.target.value);
    const imageFile = e.target.files[0];
    const imageURL = URL.createObjectURL(imageFile);
    setImageUrl(imageURL);
  }

  function reset() {
    setImage("");
    setImageUrl(null);
    setSubject("");
    setStory("");
  }

  const submit = function () {
    fetch(`${process.env.REACT_APP_API}/add_image/`, {
      method: "POST",
      // credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        file: image,
        description: story,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate("/");
      })
      .catch((err) => alert(err));
  };

  return (
    <Container maxWidth="md">
      <Box className="center text-center" mt={8}>
        <p className="heading font-800 capitalize">create post</p>
        <form onSubmit={submit}>
          <Box
            m={2}
            p={2}
            style={{
              borderRadius: "5px",
              width: "100%",
              minHeight: "30vh",
              position: "relative",
              cursor: "pointer",
              border: "2px solid #00000020",
            }}
          >
            <TextField
              fullWidth
              required
              label="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="write here"
              sx={{
                margin: "0 0 10px",
              }}
            />

            {imageUrl !== null && <img src={imageUrl} alt="image_preview" />}

            <TextField
              fullWidth
              required
              type="file"
              value={image}
              accept="image/*"
              onChange={onImageChange}
              sx={{
                margin: "0 0 10px",
              }}
            />

            <TextField
              fullWidth
              required
              id="outlined-multiline-static"
              label="descrption"
              multiline
              rows={10}
              placeholder="write here"
              value={story}
              onChange={(e) => setStory(e.target.value)}
            />

            <Box mt={2}>
              <button type="submit" className="button">
                post
              </button>
              <button type="button" onClick={reset} className="reset">
                reset
              </button>
            </Box>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default CreatePost;
