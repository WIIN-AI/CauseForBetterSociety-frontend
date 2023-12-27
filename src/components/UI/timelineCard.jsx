import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Box, Stack } from "@mui/material";
import Drawer from "./drawer";
import CommentDrawer from "./commentsDrawer";
import Dialog from "./Dialog";
import { useNavigate } from "react-router";
import {loginDetails} from './../../components/loginDetails'
import useMediaQuery from '@mui/material/useMediaQuery';



const TimelineCard = ({ setOpenComment, data, id }) => {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [open, setOpen] = useState(false);
  const [openShareLink, setOpenShareLink] = useState(false);

  const matches = useMediaQuery('(min-width:900px)');

  const navigate = useNavigate();
  const login  = loginDetails.login

  const getLike = function () {
    if (login) {
      setLike((e) => !e);
    } else {
      setOpen(true);
    }
  };


  const getComments = function () {
    setTimeout(()=>{
      setOpenComment(true)
    },300)
    clearTimeout()
    navigate(`/post/${data.image_id}`)  
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
          <img
            onClick={() => navigate(`/post/${data.image_id}`)}
            style={{ height: "127px", width: "127px", borderRadius: 3 }}
            // src={data.filename}
            src="https://img.freepik.com/free-photo/sunset-time-tropical-beach-sea-with-coconut-palm-tree_74190-1075.jpg"
            alt={data.filename}
          />
        <Box className="flex" flexDirection={"column"} width={"100%"}>
          <div onClick={() => navigate(`/post/${data.image_id}`)} style={{ padding: "0 20px", textAlign: "left" }}>
            <p style={{ marginBottom: "5px" }} className="regular">
              Published on {data.date}
            </p>
            <p className= {`font-600 ${!matches? 'regular' : 'medium'}`} style={{ marginBottom: "2px" }}>
              {data.heading}
            </p>
            <p className="text-warp regular font-300">{data.description.split('<br />').map(e => (e))}</p>
          </div>
            <br />


            <Stack left={'15vh'} bottom={'1vh'} flexDirection={"row"} justifyContent={"space-between"} position={"absolute"} >
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
      <Drawer open={open} setOpen={setOpen} />
      <Dialog setOpenShareLink={setOpenShareLink} openShareLink={openShareLink}>
        {`${window.location.href}post/${data.image_id}`}
      </Dialog>
    </Box>
  );
};

export default TimelineCard;
