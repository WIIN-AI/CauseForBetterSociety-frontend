import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { TextField } from "@mui/material";
import Comment from './comment'

const Comments = ({data, open = false, setOpen }) => {
  return (
    <>
      <SwipeableDrawer
        anchor={"right"}
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(false)}
      >
        <Box p={3} sx={{width: "35vh", height: "100vh" }} role="presentation">
          <Box textAlign={"left"}>
            <p className="sub-heading font-600 center">
              Comments
            </p>
            <p>{data.description}</p>
            <TextField
              fullWidth
              required
              id="outlined-multiline-static"
              multiline
              rows={4}
              placeholder="write comment here"
              sx={{
                marginTop: 1
              }}
            />
          </Box>
          <Box mt={1} textAlign={"right"}>
            <button type="submit" className="button">send</button>
          </Box>
          <Comment/>
          <Comment/>
        </Box>
      </SwipeableDrawer>
    </>
  );
}

export default Comments