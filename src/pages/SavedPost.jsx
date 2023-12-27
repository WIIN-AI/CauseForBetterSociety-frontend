import { Grid } from '@mui/material'
import React from 'react'
import Menu from '../components/UI/Menu'

const SavedPost = () => {
  return (
    <Grid mt={8} marginX={1} className="flex">
      <Grid container md={8} item>
        <p>saved posts</p>
      </Grid>
      <Menu/>
    </Grid>
  )
}

export default SavedPost