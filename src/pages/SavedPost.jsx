import { Box, Grid } from '@mui/material'
import React from 'react'
import Notification from '../components/UI/notification'

const SavedPost = () => {
  return (
    <Grid mt={8} marginX={1} className="flex">
      <Grid container md={8} item>
        <p>saved posts</p>
      </Grid>
      <Grid container md={4} item m={1}>
        <Box position={"fixed"}>
          <Notification />
        </Box>
      </Grid>
    </Grid>
  )
}

export default SavedPost