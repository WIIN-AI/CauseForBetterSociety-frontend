import React from 'react'
import { Grid } from '@mui/material'
import Menu from '../components/UI/Menu'

const Profile = () => {
  return (
    <Grid mt={8} marginX={1} className="flex">
      <Grid container md={8} item>
        <p>Profile</p>
      </Grid>
      <Menu/>
    </Grid>
  )
}
export default Profile;