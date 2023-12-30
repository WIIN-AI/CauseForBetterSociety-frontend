import React from "react";
import TimelineCard from "../components/UI/timelineCard";
import { Grid } from "@mui/material";
import useFetch from "../components/hooks/useFetch";
import Loader from "../components/UI/loader/Loader";
import useMediaQuery from '@mui/material/useMediaQuery';
import Menu from "../components/UI/Menu";


const Home = ({setOpenComment}) => {

  const {data : timelineCardData , pending , error} = useFetch(`${process.env.REACT_APP_API}/get_images/`)

  return (
    <Grid mt={8} marginX={1} className="flex">
      <Grid container md={8} item>
        {pending && <Loader/>}
        {timelineCardData.map((data, i) => <TimelineCard key={i} data={data} setOpenComment={setOpenComment} />)}
      </Grid>
      <Menu/>
    </Grid>
  );
};

export default Home;
