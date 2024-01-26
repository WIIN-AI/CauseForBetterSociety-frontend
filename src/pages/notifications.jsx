import { Box, Container, Grid, Stack, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import Menu from "../components/UI/Menu";
import { userDetails } from "../components/loginDetails";
import { useNavigate } from "react-router";

const Notifications = ({setOpenComment}) => {
  const matches = useMediaQuery("(min-width:900px)");

  const NotificationsCard = (data) => {

    const {read, date, title, name, postId, id} = data.data
    const navigate = useNavigate()

    function markasRead(){

      fetch(`${process.env.REACT_APP_API}/read_notification`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userDetails.email,
          id: id
        })
      })
        .then((response) => response.json())
        .then(() => {
          name === "commented" && getComments();
          navigate(`/post/${postId}`);
        })
        .catch((err) => console.log(err));
    }

    const getComments = function () {
      setTimeout(()=>{
        setOpenComment(true)
      },300)
      clearTimeout()
    };

    return (
      <Box
        bgcolor="#fcfcfc"
        border={read ? "1px solid #00000020" : "1px solid #00000080"}
        mt={1}
        minHeight={70}
        boxSizing={"border-box"}
        borderRadius={1}
        style={{ padding: "10px 15px" }}
        onClick={markasRead}
      >
        <Stack
          className="regular"
          mb={1}
          direction="row"
          justifyContent={"space-between"}
        >
          <p className="font-black font-600">{name}</p>
          <p style={{ opacity: "80%" }}>{date}</p>
        </Stack>
        <p className="regular font-400">
          {title}
        </p>
      </Box>
    );
  };

  const [notificationDetails, setNotificationDetails] = useState([]);

  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API}/get_notifications?email=${userDetails.email}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(data => setNotificationDetails(data))
      .catch((err) => console.log(err));
  },[])

  return (
    <Grid mt={8} marginX={1} className="flex">
      <Grid container md={8} item display={"block"}>
        <Container maxWidth={matches && "sm"}>
          <p className="medium font-600">Your Notifications</p>
          <br />
          {notificationDetails.map(data => <NotificationsCard data={data} />)}
        </Container>
      </Grid>
      <Menu />
    </Grid>
  );
};

export default Notifications;
