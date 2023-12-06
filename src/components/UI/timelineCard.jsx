import React, { useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { Box } from "@mui/material";
import Drawer from "./drawer";

const TimelineCard = ({ data }) => {

  const [like, setLike] = useState(false);
  const [save, setSave] = useState(false);
  const [open, setOpen] = useState(false)

  const login = false

  const getLike = function () {
    if(login){
      setLike((e) => !e);
    }else{
      setOpen(true)
    }
  };

  const getSave = function () {
    if(login){
      setSave((e) => !e);
    }else{
      setOpen(true)
    }
  };

  return (
    <Box
      className="flex bg-primary"
      style={{
        margin: "5px 0",
        borderRadius: "5px",
        width: "100%",
        position: "relative",
        border: "2px solid #00000020",
        padding: 2,
      }}
    >
      <img
        style={{ height: "120px", width: "120px", borderRadius: 3 }}
        src="https://img.freepik.com/free-photo/sunset-time-tropical-beach-sea-with-coconut-palm-tree_74190-1075.jpg"
        alt="sunset"
      />
      <Box style={{ padding: "0 20px", textAlign: "left" }}>
        <p style={{ marginBottom: "5px" }} className="regular">
          Published in 20th nov
        </p>
        <p className="medium font-600" style={{ marginBottom: "2px" }}>
          Something is wrong with this light
        </p>
        <p className="text-warp regular font-300">{data.description}</p>
        <br />

        <Box className="flex center">
          <Box
            style={{
              position: "relative",
              justifyContent: "space-between",
              bottom: 0,
            }}
          >
            {like ? (
              <FavoriteIcon
                onClick={getLike}
                style={{ margin: "0px 5px 5px 0" }}
              />
            ) : (
              <FavoriteBorderIcon
                onClick={getLike}
                style={{ margin: "0px 10px 5px 0" }}
              />
            )}
            <ChatBubbleOutlineIcon style={{ margin: "0px 10px 4px" }} />
            <ShareIcon style={{ margin: "0px 10px 6px" }} />
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
          </Box>
        </Box>
      </Box>
        <Drawer open={open} setOpen={setOpen}/>
    </Box>
  );
};

export default TimelineCard;
