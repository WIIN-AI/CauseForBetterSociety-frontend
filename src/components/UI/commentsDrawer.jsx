import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { TextField, useMediaQuery } from "@mui/material";
import Comment from "./comment";
import { useEffect } from "react";
import { useState } from "react";
import { loginDetails } from "../loginDetails";
import { TextInputProps } from "../../pages/createPost";

const Comments = ({ data, open = false, setOpen }) => {
  const login = loginDetails.login;
  const [comment, setComment] = useState([]);
  const fetchComments = comment.sort((a, b) => b.id.localeCompare(a.id))

  const [writeComment, setWriteComment] = useState("");
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const matches = useMediaQuery('(min-width:600px)');


  function getComments() {
    fetch(`${process.env.REACT_APP_API}/get_comments?id=${data}`, {
      method: "GET",
      // credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw Error("could not fetch the data");
        }
        return response.json();
      })
      .then((data) => {
        setComment(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    open && getComments();
  }, [open]);

  const sendComment = function (e) {
    e.preventDefault();
    fetch(
      `${process.env.REACT_APP_API}/add_comment`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id : data,
          comment: writeComment,
          name: userDetails.name
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result.message);  
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setWriteComment("");
        getComments();
      });
  };

  return (
    <>
      <SwipeableDrawer
        anchor={matches ? "right" : "bottom"}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(false)}
      >
        <Box boxSizing={"border-box"} p={3} sx={{ width: matches ? "35vh" : "100%",  height: "100vh" }} role="presentation">
          <p className="sub-heading font-600 center">Comments</p><br/>
          <p>{data.description}</p>
          {login && (
            <form onSubmit={sendComment}>
              <Box textAlign={"left"}>
                <TextField
                  fullWidth
                  required
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  placeholder="write your comment here"
                  value={writeComment}
                  onChange={(e) => setWriteComment(e.target.value)}
                  {...TextInputProps}
                />
              </Box>
              <Box mt={1} textAlign={"right"}>
                <button type="reset" className="reset" onClick={() => {setOpen(false); setWriteComment("")}}>
                  close
                </button>
                <button type="submit" className="button">
                  send
                </button>
              </Box>
            </form>
          )}
          {fetchComments.map((data, i) => (
            <Comment key={i} data={data} />
          ))}
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default Comments;
