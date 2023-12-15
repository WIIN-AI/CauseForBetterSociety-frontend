import React from 'react'
import Notification from '../components/UI/notification'
import { Box, Grid } from '@mui/material'

const Profile = () => {
  return (
    <Grid mt={8} marginX={1} className="flex">
      <Grid container md={8} item>
        <p>Profile</p>
      </Grid>
      <Grid container md={4} item m={1}>
        <Box position={"fixed"}>
          <Notification />
        </Box>
      </Grid>
    </Grid>
  )
}
export default Profile;