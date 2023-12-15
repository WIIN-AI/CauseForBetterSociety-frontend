import { Box, Container, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginDetails} from './../../components/loginDetails'

const CreatePost = () => {
  const navigate = useNavigate();

  const login  = loginDetails.login

  useEffect(()=>{
    !login && navigate('/')
  },[login ,navigate])


  const [subject, setSubject] = useState("");
  const [story, setStory] = useState("");

  const [image, setImage] = useState();
  const [imageValue, setImageValue] = useState("");
  const [imageUrl, setImageUrl] = useState(null);

  function onImageChange(e) {
    setImageValue(e.target.value)
    setImage(e.target.files[0]);
    const imageFile = e.target.files[0];
    const imageURL = URL.createObjectURL(imageFile);
    setImageUrl(imageURL);
  }


  function reset() {
    setImage();
    setImageUrl(null);
    setSubject("");
    setStory("");
    setImageValue('')
  }


  const submit = async function (event) {

    event.preventDefault()
    const formData = new FormData();
    formData.append('file', image);
    formData.append('description', story);

    try {
      const response = await fetch(`${process.env.REACT_APP_API}/add_image/`, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log("Success:", result);
      alert(result.message)
      reset()
      navigate('/')
    } 
    catch (error) {
      console.error("Error:", error);
    }
  }

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
                margin: "5px 0",
              }}
            />

            {imageUrl !== null && <img style={{height: '200px'}} src={imageUrl} alt="image_preview" />}

            <TextField
              fullWidth
              required
              type="file"
              value={imageValue}
              accept="image/*"
              onChange={onImageChange}
              sx={{
                margin: "5px 0",
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
              sx={{
                margin: "5px 0",
              }}
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
