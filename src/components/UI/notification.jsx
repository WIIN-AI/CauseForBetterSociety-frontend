import { Box, Grid, TextField } from "@mui/material";
import React from "react";

const Notification = () => {
  return (
    <Grid minWidth={"37vh"} container item>
        <Box textAlign={"center"} width={'100%'} borderRadius={'2px'} p={1} mb={1} bgcolor={"black"} color={"white"}>
          Menu
        </Box>
        <Box textAlign={"left"} width={'100%'} pl={2}>
          <Box classname='medium' mb={2} borderRadius={'2px'} p={1}>
            Home
          </Box>
          <Box classname='medium' mb={2} borderRadius={'2px'} p={1}>
            Cleared issues
          </Box>
          <Box classname='medium'  mb={2} borderRadius={'2px'} p={1}>
            About
          </Box>
          <Box classname='medium' mb={2} borderRadius={'2px'} p={1}>
            Contact us
          </Box>
          
        </Box>
        <Box textAlign={"center"} width={'100%'} borderRadius={'2px'} mb={1} p={1} bgcolor={"black"} color={"white"}>
          notification
        </Box>
    </Grid>
  );
};

export default Notification;
