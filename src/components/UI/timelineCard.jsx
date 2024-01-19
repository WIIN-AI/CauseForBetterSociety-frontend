import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Box, Stack } from "@mui/material";
import NotsigninDrawer from "./drawer";
import Dialog from "./Dialog";
import { useNavigate } from "react-router";
import {loginDetails} from './../../components/loginDetails'
import useMediaQuery from '@mui/material/useMediaQuery';



const   TimelineCard = ({ setOpenComment, data }) => {
  const [like, setLike] = useState(data.you_liked);
  const [save, setSave] = useState(data.you_saved);
  const [open, setOpen] = useState(false);
  const [openShareLink, setOpenShareLink] = useState(false);

  const matches = useMediaQuery('(min-width:900px)');
  const mobilematches = useMediaQuery('(min-width:600px)');

  const userDetails = JSON.parse(localStorage.getItem('userDetails'));

  const navigate = useNavigate();
  const login  = loginDetails.login

  const getLike = function() {
    if (login) {
      fetch(`${process.env.REACT_APP_API}/liked`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data.id,
          email: userDetails.email,
        })
      })
        .then((response) => response.json())
        .then(() => {
          setLike((e) => !e);
        })
        .catch((err) => console.log(err));
    } else {
      setOpen(true);
    }
  };


  const getComments = function () {
    setTimeout(()=>{
      setOpenComment(true)
    },300)
    clearTimeout()
    navigate(`/post/${data.id}`)  
  };

  const getSave = function () {
    if (login) {
      fetch(`${process.env.REACT_APP_API}/save`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: data.id,
          email: userDetails.email,
        })
      })
        .then((response) => response.json())
        .then(() => {
          setSave((e) => !e);
        })
        .catch((err) => console.log(err));
    } else {
      setOpen(true);
    }
  } 

  const shareLink = function () {
    console.log("hello")
    setOpenShareLink(true);
  };

  return (
    <Box
      className="bg-primary"
      boxSizing={"border-box"}
      style={{
        margin: "5px 0",
        borderRadius: "5px",
        width: "100%",
        height: "135px",
        position: "relative",
        border: "2px solid #00000020",
        padding: 2,
        cursor : "default"
      }}
    >
      <Box className="flex">
        <div>
          <img
            onClick={() => navigate(`/post/${data.id}`)}
            style={{ height: "127px", width: "127px", borderRadius: 3 , objectFit: "cover" }}
            // src={data.filename}
            src={data.imagepath}
            alt={data.filename}
          />
        </div>
        <Box className="flex" flexDirection={"column"} width={ !mobilematches ? "76%" : '100%'} pl={2}>
          <div onClick={() => navigate(`/post/${data.id}`)} style={{ textAlign: "left", marginTop: "5px" }}>
            <p style={{ marginBottom: "5px" }} className="regular">
              Published on {data.createdAt}
            </p>
            <p className= {`font-600 ${!mobilematches? 'regular' : 'medium'}`}>
              {data.heading}
            </p>
            <p style={{width: '70%'}} className="font-Nota text-warp regular font-500">{data.description.split('<br />').join(" ")}</p>
          </div>
            <br />


            <Stack bottom={'1vh'} flexDirection={"row"} justifyContent={"space-between"} position={"absolute"} >
                {like ? (
                  <FavoriteIcon
                    onClick={getLike}
                    color="error"
                    style={{ margin: "0px 10px 5px 0" , display: "flex"}}
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={getLike}
                    style={{ margin: "0px 10px 5px 0" , display: "flex" }}
                  />
                )}
                <ChatBubbleOutlineIcon
                  onClick={getComments}
                  style={{ margin: "0px 10px 4px", display: "flex" }}
                />
                <ShareIcon
                  onClick={shareLink}
                  style={{ margin: "0px 10px 6px", display: "flex" }}
                />
          </Stack>

            <Stack right={'1vh'} bottom={'1vh'} flexDirection={"row"} justifyContent={"space-between"} position={"absolute"} >
                {save ? (
                  <BookmarkIcon
                    onClick={getSave}
                    style={{ margin: "0px 10px 6px", display: "flex" }}
                  />
                ) : (
                  <BookmarkBorderIcon
                    onClick={getSave}
                    style={{ margin: "0px 10px 6px", display: "flex" }}
                  />
                )}
          </Stack>
        </Box>
      </Box>
      <NotsigninDrawer open={open} setOpen={setOpen} />
      <Dialog setOpenLink={setOpenShareLink} openLink={openShareLink}>
        {`${window.location.href}post/${data.id}`}
      </Dialog>
    </Box>
  );
};

export default TimelineCard;
