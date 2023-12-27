import { Box, Grid, useMediaQuery } from '@mui/material';
import React from 'react'
import Notification from './notification';


const Menu = () => {

  const matches = useMediaQuery('(min-width:900px)');
  
  return (
    <>
    {matches && <Grid container lg={4} md={5} item m={1}>
        <Box position={"fixed"}>
          <Notification/>
        </Box>
      </Grid>}
  </>
  )
}

export default Menu