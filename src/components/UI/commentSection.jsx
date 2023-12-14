import React, { useEffect } from "react";
import Comment from "./comment";
import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { loginDetails } from "../loginDetails";

const CommentSection = ({ id }) => {
  const login = loginDetails.login;
  const [comment, setComment] = useState([]);

  const [writeComment, setWriteComment] = useState("");

  useEffect(() => {
    getComments();
  }, []);

  function getComments() {
    fetch(`${process.env.REACT_APP_API}/get_comments/${id}`, {
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

  const sendComment = function (e) {
    e.preventDefault();
    fetch(
      `${process.env.REACT_APP_API}/add_comment/${id}?comment=${writeComment}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: id,
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
    <Box mb={8} role="presentation">
      <p className="sub-heading font-600 center">Comments</p><br/>
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
      )}
      {comment.map((data) => (
        <Comment data={data} />
      ))}
    </Box>
  );
};

export default CommentSection;
