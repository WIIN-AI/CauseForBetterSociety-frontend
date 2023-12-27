import { Grid } from '@mui/material'
import React from 'react'
import Menu from '../components/UI/Menu'

const YourArticle = () => {
  return (
    <Grid mt={8} marginX={1} className="flex">
      <Grid container md={8} item>
        <p>Your Article</p>
      </Grid>
     <Menu/>
    </Grid>
  )
}

export default YourArticle