import React from "react";
import TimelineCard from "../components/UI/timelineCard";
import { Box, Grid } from "@mui/material";
import Notification from "../components/UI/notification";
import useFetch from "../components/hooks/useFetch";
import Loader from "../components/UI/loader/Loader";
import useMediaQuery from '@mui/material/useMediaQuery';


const Home = ({setOpenComment}) => {

  const {data : timelineCardData , pending , error} = useFetch(`${process.env.REACT_APP_API}/get_images/`)
  const matches = useMediaQuery('(min-width:900px)');

  return (
    <Grid mt={8} mb={2} marginX={1} className="flex">
      <Grid container lg={8} md={12} item>
        {pending && <Loader/>}
        {timelineCardData.map((data, i) => <TimelineCard key={i} data={data} id={i} setOpenComment={setOpenComment} />)}
      </Grid>
      {matches && <Grid container lg={4} md={5} item m={1}>
        <Box position={"fixed"}>
          <Notification/>
        </Box>
      </Grid>}
    </Grid>
  );
};

export default Home;
