import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { Box } from "@mui/material";
import Drawer from "./drawer";
import CommentDrawer from "./commentsDrawer";
import Dialog from "./Dialog";
import { useNavigate } from "react-router";
import {loginDetails} from './../../components/loginDetails'
import useMediaQuery from '@mui/material/useMediaQuery';



const TimelineCard = ({ data, id }) => {
  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [open, setOpen] = useState(false);
  const [openComment, setOpenComment] = useState(false);
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
      setOpenComment(true);
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
      }}
    >
      <Box className="flex">
          <img
            onClick={() => navigate(`/post/${id}`)}
            style={{ height: "127px", width: "127px", borderRadius: 3 }}
            src="https://img.freepik.com/free-photo/sunset-time-tropical-beach-sea-with-coconut-palm-tree_74190-1075.jpg"
            alt="sunset"
          />
        <Box className="flex" flexDirection={"column"}>
          <div onClick={() => navigate(`/post/${id}`)} style={{ padding: "0 20px", textAlign: "left" }}>
            <p style={{ marginBottom: "5px" }} className="regular">
              Published in 20th nov
            </p>
            <p className= {`font-600 ${!matches? 'regular' : 'medium'}`} style={{ marginBottom: "2px" }}>
              Something is wrong with this light
            </p>
            <p className="text-warp regular font-300">{data.description}</p>
          </div>
            <br />


            <Box pl={3} className="flex center">
              <div>
                {like ? (
                  <FavoriteIcon
                    onClick={getLike}
                    color="error"
                    style={{ margin: "0px 10px 5px 0" }}
                  />
                ) : (
                  <FavoriteBorderIcon
                    onClick={getLike}
                    style={{ margin: "0px 10px 5px 0" }}
                  />
                )}
                <ChatBubbleOutlineIcon
                  onClick={getComments}
                  style={{ margin: "0px 10px 4px" }}
                />
                <ShareIcon
                  onClick={shareLink}
                  style={{ margin: "0px 10px 6px" }}
                />
                {save ? (
                  <BookmarkIcon
                    onClick={getSave}
                    style={{ margin: "0px 10px 6px" }}
                  />
                ) : (
                  <BookmarkBorderIcon
                    onClick={getSave}
                    style={{ margin: "0px 10px 6px" }}
                  />
                )}
            </div>
          </Box>
        </Box>
      </Box>
      <Drawer open={open} setOpen={setOpen} />
      <CommentDrawer data={data} open={openComment} setOpen={setOpenComment} />
      <Dialog setOpenShareLink={setOpenShareLink} openShareLink={openShareLink}>
        {`${window.location.href}post/${id}`}
      </Dialog>
    </Box>
  );
};

export default TimelineCard;
