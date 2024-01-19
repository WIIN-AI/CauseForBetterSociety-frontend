import { Box, Container, Divider, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import NotsigninDrawer from "../components/UI/drawer";
import RequestSection from "../components/UI/requestSection";
import Dialog from "../components/UI/Dialog";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate, useParams } from "react-router";
import {loginDetails} from '../components/loginDetails'
import CommentDrawer from "../components/UI/commentsDrawer";
import RequestDialog from "../components/UI/RequestDialog";
import ConfirmModal from "../components/UI/confirmModal";



const PostDetails = ({openComment, setOpenComment}) => {
  const { id } = useParams("");
  const myRef = useRef(null);  

  const navigate = useNavigate()


  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [loginPop, setLoginPop] = useState(false);
  const [openShareLink, setOpenShareLink] = useState(false);
  const [requestDialog, setRequestDialog] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [data, setData]= useState([])

  const [anchorEl, setAnchorEl] = useState(null);
  const moreOpen = Boolean(anchorEl);  
  const [paragraph, setParagraph] = useState([])

  const matches = useMediaQuery('(min-width:900px)');
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const login  = loginDetails.login
  
  useEffect(() => {
    async function fetchData(ipAddress){
    try {
      const response = await fetch(`${process.env.REACT_APP_API}/post_details`, {
        method: "POST",
        // credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "id" : id,
          "ip" : ipAddress,
          "email": userDetails && userDetails.email 
        })
      })
      const result = await response.json();
      console.log("Success:", result);
      setData(result)
      const spiltLine = result?.description.split('<br />')
      setParagraph(spiltLine)
      setLike(result.you_liked)
      setSave(result.you_saved)
    }
    catch(error){
      console.log(error)
    }
  }
      fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data =>  fetchData(data.ip))

  }, [id]);


    // useEffect(() => {
    //   fetch('https://api.ipify.org?format=json')
    //     .then(response => response.json())
    //     .then(data => fetch(`${process.env.REACT_APP_API}/take_view`,{
    //       headers: { "Content-Type": "application/json" },
    //       method: "POST",
    //       body: JSON.stringify({
    //         "id" : id,
    //         "ip" : data.ip,
    //       })
    //   }))
    //     .catch(error => console.log(error))
    // }, [id]);


  const getLike = function() {
    if (login) {
      fetch(`${process.env.REACT_APP_API}/liked`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          email: userDetails.email,
        })
      })
        .then((response) => response.json())
        .then(() => {
          setLike((e) => !e);
        })
        .catch((err) => console.log(err));
    } else {
      setLoginPop(true);
    }
  };

  const getComments = function () {
    setOpenComment(true)
  };

  const getSave = function () {
    if (login) {
      fetch(`${process.env.REACT_APP_API}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
          email: userDetails.email,
        })
      })
        .then((response) => response.json())
        .then(() => {
          setSave((e) => !e);
        })
        .catch((err) => console.log(err));
    } else {
      setLoginPop(true);
    }
  } 

  const shareLink = function () {
    setOpenShareLink(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = (e) => {
    setAnchorEl(null);
    if(login){
      if(e.target.value === 0){
        setRequestDialog(true); 
        console.log(1)
      }
      if(e.target.value === 1){
        setTimeout(()=>{
          alert('reported successfully')
        },200)
        clearTimeout()
      }
      if(e.target.value === 2){
        setConfirmOpen(true)
      }
    }else{
      setLoginPop(true);
    }   
  };


  function deletePost() {

    fetch(`${process.env.REACT_APP_API}/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: data.id,
        email: userDetails.email,
        image: data.imagepath
      })
    })
      .then((response) => response.json())
      .then(() => {
        setConfirmOpen(false)
      })
      .catch((err) => console.log(err))
      .finally(() =>{
        navigate(-1)
      });
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

  const menuList = data.email === userDetails?.email ? ["Request to complete", "Report", "Delete post"] : ["Request to complete", "Report"]

  return (
    <Container maxWidth="md" style={{ padding : matches && "0 100px"}}>
      <Box mt={8} mb={8}>
        <Box>
          <p className="heading font-700">{data.heading}</p>
          <br />
          <Box className="flex center" justifyContent={"space-between"}>
            <p className="font-500">User : {data.name}</p>
            <p>Published on {data.createdAt}</p>
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
              {menuList.map((value, i) => {
              return <MenuItem value={i} onClick={handleClose}>{value}</MenuItem>
              })}
            </Menu>
          </Box>
          <br />
          <img
            width={"100%"}
            src={data.imagepath}
            alt="post_image"
            style={{
              marginBottom: "20px",
            }}
          />
          <br />
          {data.subheading && <><p style={{whiteSpace: "pre-wrap"}} className="sub-heading font-700">
              {data.subheading}
          </p><br/></>}
          {paragraph.map((value, i) => (
            <>
            <p style={{whiteSpace: "pre-wrap"}} className="font-Nota medium font-400 text-justified" key={i}>
              {value}
            </p>
            <br/>
            </>
          ))}
          {/* <p className="medium font-400 text-justified" >{data.description}</p> */}
          <br/>
        </Box>
      </Box>
      <Divider style={{ marginBottom: "50px" }} />
      <CommentDrawer data={id} loginPop={openComment} setLoginPop={setOpenComment} />
      <RequestSection id={id} />

      <Dialog setOpenLink={setOpenShareLink} openLink={openShareLink}>
        {window.location.href}
      </Dialog>
      
      <RequestDialog setOpenLink={setRequestDialog} openLink={requestDialog}/>
      <NotsigninDrawer open={loginPop} setOpen={setLoginPop} />

      <ConfirmModal confirmOpen={confirmOpen} setConfirmOpen={setConfirmOpen} onClick={deletePost}>Are you sure to delete this post?</ConfirmModal>

    </Container>
  );
};

export default PostDetails;
