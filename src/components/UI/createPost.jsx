import { Box, Container, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [story, setStory] = useState("");

  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  function onImageChange(e) {
    setImage(e.target.files[0].name);
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
        <text className="heading font-800 capitalize">create post</text>
        <Box
          m={2}
          p={2}
          style={{
            borderRadius: "5px",
            width: "100%",
            minHeight: "50vh",
            position: "relative",
            cursor: "pointer",
            border: "2px solid #00000020",
          }}
        >
          <TextField
            fullWidth
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
            type="file"
            accept="image/*"
            onChange={onImageChange}
            sx={{
              margin: "0 0 10px",
            }}
          />

          <TextField
            fullWidth
            id="outlined-multiline-static"
            label="descrption"
            multiline
            rows={20}
            placeholder="write here"
            value={story}
            onChange={(e) => setStory(e.target.value)}
          />

          <Box mt={2}>
            <button onClick={submit} className="button">
              post
            </button>
            <button onClick={reset} className="reset">
              reset
            </button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CreatePost;