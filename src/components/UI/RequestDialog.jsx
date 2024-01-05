import * as React from "react";
// import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Container, TextField } from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { TextInputProps } from "../../pages/createPost";
import ConfirmModal from "./confirmModal";

export default function RequestDialog({ setOpenLink, openLink, children}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [confirmOpen, setConfirmOpen] = React.useState(false)

  const handleClose = () => {
    setOpenLink(false);
    setYourRequestText('')
    deleteImage()
  };

  const [yourRequestText, setYourRequestText] = React.useState("");

  function formSubmitHandler(e){
    e.preventDefault()
    setConfirmOpen(true)
  }

  const submit = function(){
    setConfirmOpen(false)
    setOpenLink(false)
    setTimeout(()=>{
      alert("your request has sent")
    },200)
    clearTimeout()
    handleClose()
  }

  const [imageUrl, setImageUrl] = React.useState(null);
  const [imageValue, setImageValue] = React.useState('')
  const [image, setImage] = React.useState();


  function onImageChange(e) {
    setImageValue(e.target.value)
    setImage(e.target.files[0]);
    const imageFile = e.target.files[0];
    const imageURL = URL.createObjectURL(imageFile);
    console.log(imageURL)
    setImageUrl(imageFile?.name);
  }

  
  function deleteImage(){
    setImage();
    setImageUrl(null);
    setImageValue('')
  }

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={openLink}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
      <Container maxWidth="sm" sx={{marginBottom: '20px' , padding: 0}}>
      <form onSubmit={formSubmitHandler}>
        <DialogTitle id="responsive-dialog-title">{"Request to complete"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Box minHeight={'20vh'} width={'50vh'}>
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
                <TextField
                  fullWidth
                  required
                  id="outlined-multiline-static"
                  label="your request text"
                  multiline
                  rows={10}
                  placeholder="write here"
                  value={yourRequestText}
                  onChange={(e) => setYourRequestText(e.target.value)}
                  {...TextInputProps}
                  />
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
                <Box onClick={deleteImage} sx={{cursor: "pointer"}}>✖</Box>
                </Box> :  
                  <TextField
                    fullWidth
                    required
                    value={imageValue}
                    onChange={onImageChange}
                    type="file"
                    placeholder="upload the image here"
                    inputProps={{accept:"image/jpeg"}}
                    {...TextInputProps}
                  /> }
                  </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <button type="submit" className="button">
              submit
            </button>
            <button className="reset" type="reset" onClick={handleClose}>
              close
            </button>
        </DialogActions>
        </form>
        </Container>
      </Dialog>
      <ConfirmModal confirmOpen={confirmOpen} setConfirmOpen={setConfirmOpen} onClick={submit}>Are you sure ?</ConfirmModal>
    </React.Fragment>
  );
}
