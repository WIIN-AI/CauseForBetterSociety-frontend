import React from 'react'
import Comment from './comment'
import { Box, TextField } from '@mui/material'

const commentSection = () => {
  return (
    <Box mb={8} role="presentation">
          <Box textAlign={"left"}>
            <p className="sub-heading font-600 center">
              Comments
            </p>
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
  )
}

export default commentSection