import { Box, Container, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginDetails} from '../components/loginDetails'
import ConfirmModal from "../components/UI/confirmModal";

const CreatePost = () => {
  const navigate = useNavigate();

  const login  = loginDetails.login

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  useEffect(()=>{
    !login && navigate('/')
  },[login ,navigate])


  const [subject, setSubject] = useState("");
  const [story, setStory] = useState("");
  const [location, setLocation] = useState("");
  const [userVisiblity, setUserVisiblity] = useState('');

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
    setUserVisiblity('')
    setLocation('')
  }


  const [confirmOpen, setConfirmOpen] = useState(false);

  const submit = async function (event) {

    const formData = new FormData();
    formData.append('file', image);
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/add_image/?heading=${subject}&description=${story.replace(/\n/g, "<br />")}&user_visibility=${userVisiblity}&location=${location}&email=${userDetails.email}`, {
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

  function handleConfirmation(event){
    event.preventDefault()
    setConfirmOpen(true)
  }

  return (
    <Container maxWidth="md">
      <Box className="center text-center" mt={8}>
        <p className="heading font-800 capitalize">create post</p>
        <form onSubmit={handleConfirmation}>
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
              label="heading"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="write here"
              sx={{
                margin: "5px 0",
              }}
            />

            {imageUrl !== null && <img style={{height: '200px'}} src={imageUrl} alt="image_preview" />}
            <Stack direction="row" spacing={1}
              sx={{
                margin: "5px 0",
              }}
            >
            <TextField
              fullWidth
              required
              type="file"
              value={imageValue}
              accept="image/*"
              onChange={onImageChange}
            />
             <TextField
              fullWidth
              required
              type="text"
              label="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="text here"
            />
            <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label">User visiblity</InputLabel>
              <Select
                value={userVisiblity}
                label="User visiblity"
                onChange={(e)=> setUserVisiblity(e.target.value)}
                required
              >
                <MenuItem value={true}>on</MenuItem>
                <MenuItem value={false}>off</MenuItem>
              </Select>
              </FormControl>
              </Stack>

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
      <ConfirmModal confirmOpen={confirmOpen} setConfirmOpen={setConfirmOpen} onClick={submit}>Are you sure ?</ConfirmModal>
    </Container>
  );
};

export default CreatePost;
