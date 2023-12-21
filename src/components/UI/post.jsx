import { Box, Container, Divider, Menu, MenuItem, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Drawer from "./drawer";
import RequestSection from "./requestSection";
import Dialog from "./Dialog";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useParams } from "react-router";
import {loginDetails} from './../../components/loginDetails'
import CommentDrawer from "./commentsDrawer";



const PostDetails = ({openComment, setOpenComment}) => {
  const { id } = useParams("");
  const myRef = useRef(null);  


  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [open, setOpen] = useState(false);
  const [openShareLink, setOpenShareLink] = useState(false);
  const [data, setData]= useState([])

  const [anchorEl, setAnchorEl] = useState(null);
  const moreOpen = Boolean(anchorEl);  
  
  useEffect(() => {
    async function fetchData(){
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/get_single_incident_details?image_id=${id}`, {
        method: "GET",
        // credentials: "include",
        headers: { "Content-Type": "application/json" },
      })
      const result = await response.json();
      console.log("Success:", result);
      setData(result)
      // const getParagraphs = result.description.replace(/\n/g, '\n')
      // const spiltLine = getParagraphs.split('\n')
      // console.log(spiltLine)
    }
    catch(error){
      console.log(error)
    }
  }
  fetchData()
  }, [id]);





  const login  = loginDetails.login

  const getLike = function () {
    if (login) {
      setLike((e) => !e);
    } else {
      setOpen(true);
    }
  };

  const getComments = function () {
    setOpenComment(true)
  };

  const getSave = function () {
    if (login) {
      setSave((e) => !e);
    } else {
      setOpen(true);
    }
  };

  const shareLink = function () {
    setOpenShareLink(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  function ChatBubbleWithText({children, onClick }) {
    return (
      <div onClick={onClick} className="flex">
        <ChatBubbleOutlineIcon />
        <Typography ml={1}>{children}</Typography>
      </div>
    );
  }

  function LikeWithText({children, onClick }) {
    return (
      <div onClick={onClick} className="flex">
        {like ? ( <FavoriteIcon color="error" onClick={getLike} /> ) : (<FavoriteBorderIcon onClick={getLike} />)}
        <Typography ml={1}>{children}</Typography>
      </div>
    );
  }
  

  return (
    <Container maxWidth="md" style={{ padding : "0 100px"}}>
      <Box mt={8} mb={8}>
        <Box>
          <p className="heading font-700">{data.heading}</p>
          <br />
          <Box className="flex center" justifyContent={"space-between"}>
            <p className="font-500">Sharan Murthi</p>
            <p style={{ opacity: "70%" }}>Published in Oct 17</p>
          </Box>
          <Box className="flex center" justifyContent={"space-between"}>
            <p className="font-500">
              Issue :{" "}
              <span className="font-500 uppercase" style={{ color: "red" }}>
                pending
              </span>
            </p>
            <p>{data.location}</p>
          </Box>
          <br />
          <Box
            className="flex center"
            height={40}
            padding={1}
            position="relative"
            border={"1px solid #e2e2e2"}
            boxSizing={"border-box"}
            justifyContent={"space-between"}
            pt={1}
            sx={{
              borderStyle: "solid hidden",
            }}
          >
            <LikeWithText>{data.comments?.length > 0 ? data.comments?.length : "" }</LikeWithText>
            <ChatBubbleWithText onClick={getComments}>{data.comments?.length > 0 ? data.comments?.length : "" }</ChatBubbleWithText>
            <ShareIcon onClick={shareLink} />
            {save ? (<BookmarkIcon onClick={getSave} />) : (<BookmarkBorderIcon onClick={getSave} />)}
            <MoreHorizIcon onClick={handleClick} />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={moreOpen}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Request to complete</MenuItem>
              <MenuItem onClick={handleClose}>Report</MenuItem>
            </Menu>
          </Box>
          <br />
          <img
            width={"100%"}
            src="https://i.pinimg.com/originals/cf/e8/5e/cfe85ed3a39d1bcb65b5da5c4f75b363.jpg"
            alt="post_image"
            style={{
              marginBottom: "20px",
            }}
          />
          <br />
          {/* {data['description'].map((paragraph) => (
            <>
            <p className="medium font-400" key={paragraph}>
              {paragraph}
            </p><br/>
            </>
          ))} */}
          <p className="medium font-400 text-justified">{data.description}</p>
          <br/>
        </Box>
      </Box>
      <Divider style={{ marginBottom: "50px" }} />
      <Drawer open={open} setOpen={setOpen} />
      <CommentDrawer data={id} open={openComment} setOpen={setOpenComment} />
      <RequestSection id={id} />
      <Dialog setOpenShareLink={setOpenShareLink} openShareLink={openShareLink}>
        {window.location.href}
      </Dialog>
    </Container>
  );
};

export default PostDetails;
