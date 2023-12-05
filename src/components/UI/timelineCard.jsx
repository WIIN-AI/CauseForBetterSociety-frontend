import React, { useState } from "react";
import IosShareIcon from "@mui/icons-material/IosShare";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';

const TimelineCard = ({data}) => {

  const [like, setLike] = useState(false)
  const [save, setSave] = useState(false)

  const getLike = function(){
    setLike(e => !e)
  }

  const getSave = function(){
    setSave(e => !e)
  }


  return (
    <div
      className="flex bg-primary"
        style={{
          margin: "5px 0",
          borderRadius: "5px",
          width:"100%",
          position: "relative",
          cursor: 'pointer',
          border: '2px solid #00000020',
          padding: 2
        }}
    >
      <img
        style={{height: "120px", width: "120px", borderRadius: 3}}
        src="https://img.freepik.com/free-photo/sunset-time-tropical-beach-sea-with-coconut-palm-tree_74190-1075.jpg"
        alt="sunset"
      />
      <div style={{ padding: "0 20px", textAlign: "left"}}>
        <p style={{ marginBottom: "5px" }} className="regular">Published in 20th nov</p>
        <p className="medium font-600" style={{ marginBottom: "2px" }}>
          Something is wrong with this light
        </p>
        <p className="regular font-300">
          {data.description}
        </p>

        <div className="flex center" >
          <div style={{position: "absolute", justifyContent: 'space-between', bottom: 0}}>             
            <ThumbUpIcon onClick={getLike} color={like ? "primary": "inherit"} style={{margin: '0px 10px 6px 0px'}}/>
            <CommentIcon  style={{margin: '0px 10px 3px'}}/>
            <IosShareIcon  style={{margin: '0px 10px 6px'}}/>
          </div>
          <div onClick={getSave} style={{position: "absolute", justifyContent: 'space-between', bottom: 5, right: 5}}>
            {save ? <TurnedInIcon/>: <TurnedInNotIcon/>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineCard;
