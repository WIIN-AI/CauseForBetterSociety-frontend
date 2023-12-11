import React from "react";
import TimelineCard from "../components/UI/timelineCard";
import { Box, Grid } from "@mui/material";
import Notification from "../components/UI/notification";
import useFetch from "../components/hooks/useFetch";
import Loader from "../components/UI/loader/Loader";

const Home = () => {

  const {data : timelineCardData , pending , error} = useFetch(`${process.env.REACT_APP_API}/get_images/`)

  return (
    <Grid mt={8} marginX={1} className="flex">
      <Grid container md={8} item>
        {pending && <Loader/>}
        {timelineCardData.map((data, i) => <TimelineCard key={i} data={data} id={i} />)}
      </Grid>
      <Grid container md={4} item m={1}>
        <Box position={"fixed"}>
          <Notification />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Home;
