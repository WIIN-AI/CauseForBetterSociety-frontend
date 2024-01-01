import { Box, Container, FormControl, Grid, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {loginDetails} from '../components/loginDetails'
import ConfirmModal from "../components/UI/confirmModal";
import { red } from "@mui/material/colors";

export const TextInputProps = {
  InputLabelProps:{
    style: { color: 'grey' },
  },
  sx:{
    margin: "5px 0",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: 'black',
        border: 2
      }
    }
  } 
}

const CreatePost = () => {
  const navigate = useNavigate();

  const login  = loginDetails.login

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  useEffect(()=>{
    !login && navigate('/')
  },[login ,navigate])


  const [subject, setSubject] = useState("");
  const [subheading, setSubheading] = useState("");

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
    setImageUrl(imageFile?.name);
  }

  function reset() {
    setImage();
    setImageUrl(null);
    setSubject("");
    setSubheading('')
    setStory("");
    setImageValue('')
    setUserVisiblity('')
    setLocation('')
  }

  function deleteImage(){
    setImage();
    setImageUrl(null);
    setImageValue('')
  }

  // console.log(imageUrl)


  const [confirmOpen, setConfirmOpen] = useState(false);
  const [progress, setProgress] = useState(0);


  const submit = async function (event) {

    const formData = new FormData();
    formData.append('file', image);
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/add_image/?heading=${subject}&description=${story.replace(/\n/g, "<br />")}&subheading=${subheading}&user_visibility=${userVisiblity}&location=${location}&email=${userDetails.email}`, {
        method: "POST",
        body: formData,
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        },
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

  // console.log(progress)

  return (
    <Container maxWidth="md">
      <Box className="center text-center" mt={8} mb={8}>
        <p className="heading font-800 capitalize">create post</p>
        <form onSubmit={handleConfirmation}>
          <Box
            m={2}
            p={2}
            style={{
              borderRadius: "5px",
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
              date
              {...TextInputProps}
            />

            {/* {imageUrl !== null && <img style={{height: '200px'}} src={imageUrl} alt="image_preview" />} */}
            {imageUrl !== null && <Box
              display={"flex"}
              alignItems={"center"}
              bgcolor={"#EAF0FF"} 
              color={"black"} 
              height={50}
              borderRadius={1} 
              sx={{width:'100%', border: "2px solid #00000020", margin: "5px 0 10px"}} 
              p={2}>
                {imageUrl}
              </Box>}
            <Stack   direction={{ xs: 'column', sm: 'row' }} spacing={1}
              sx={{
                margin: "5px 0",
              }}
              >
              {imageUrl !== null ? 
            <Box
              display={"flex"}
              bgcolor={"#BF3131"} 
              color={"white"} 
              borderRadius={1} 
              sx={{width:'100%'}} 
              justifyContent={"space-between"} 
              alignItems={"center"} 
              p={2}>
            <Box > Delete image</Box>
            <Box onClick={deleteImage}>✖</Box>
            </Box> :
            <TextField
              fullWidth
              required
              type="file"
              value={imageValue}
              inputProps={{accept:"image/jpeg"}}
              onChange={onImageChange}
              {...TextInputProps}
            /> }
             <TextField
              fullWidth
              required
              type="text"
              label="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="text here"
              {...TextInputProps}
            />
              <TextField
                fullWidth
                {...TextInputProps}
                value={userVisiblity}
                label="user visiblity"
                variant="outlined"
                placeholder=""
                onChange={(e)=> setUserVisiblity(e.target.value)}
                required
                select
              >
                <MenuItem value={true}>on</MenuItem>
                <MenuItem value={false}>off</MenuItem>
              </TextField>
              </Stack>

            <TextField
              fullWidth
              label="sub-heading (optional)"
              value={subheading}  
              onChange={(e) => setSubheading(e.target.value)}
              placeholder="optional"
              {...TextInputProps}
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
              {...TextInputProps}
            />

            <Box mt={2}>
              <button type="submit" className="button">
                post
              </button>
              <button type="reset" onClick={reset} className="reset">
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
