import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { TextField } from "@mui/material";
import Comment from "./comment";
import { useEffect } from "react";
import { useState } from "react";

const Comments = ({ data, open = false, setOpen }) => {
  const [comment, setComment] = useState([]);

  const [writeComment, setWriteComment] = useState("");

  function getComments() {
    fetch(`${process.env.REACT_APP_API}/get_comments/${data.filename}`, {
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
        setComment(data.comments);
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
      `${process.env.REACT_APP_API}/add_comment/${data.filename}?comment=${writeComment}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: data.filename,
          comment: writeComment,
        }),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        alert(result.message);
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
        anchor={"right"}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(false)}
      >
        <Box p={3} sx={{ width: "35vh", height: "100vh" }} role="presentation">
          <form onSubmit={sendComment}>
            <Box textAlign={"left"}>
              <p className="sub-heading font-600 center">Comments</p>
              <p>{data.description}</p>
              <TextField
                fullWidth
                required
                id="outlined-multiline-static"
                multiline
                rows={4}
                placeholder="write your comment here"
                value={writeComment}
                onChange={(e) => setWriteComment(e.target.value)}
                sx={{
                  marginTop: 1,
                }}
              />
            </Box>
            <Box mt={1} textAlign={"right"}>
              <button type="submit" className="button">
                send
              </button>
            </Box>
          </form>
          {comment.map((data) => (
            <Comment data={data} />
          ))}
        </Box>
      </SwipeableDrawer>
    </>
  );
};

export default Comments;
