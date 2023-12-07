import { Box, Grid } from "@mui/material";
import React from "react";

const Notification = () => {
  return (
    <Grid minWidth={"37vh"} container item>
        <Box textAlign={"center"} width={'100%'} borderRadius={'2px'} p={1} bgcolor={"black"} color={"white"}>
          notification
        </Box>
    </Grid>
  );
};

export default Notification;
