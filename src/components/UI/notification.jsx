import { Box, Grid, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SearchIcon from '@mui/icons-material/Search';
import {loginDetails} from './../../components/loginDetails'
import { googleLogout } from '@react-oauth/google';
import ConfirmModal from "./confirmModal";

const Notification = () => {
  const navigate = useNavigate();

  function signOut(){
    setConfirmOpen(false)
    localStorage.removeItem('userDetails');
    window.location.pathname = '/signin'
  }

  const [confirmOpen, setConfirmOpen] = useState(false);


  const login  = loginDetails.login
  
  
  return (
    <Grid container item>
      <Box
        textAlign={"center"}
        width={"100%"}
        borderRadius={"2px"}
        p={1}
        bgcolor={"black"}
        color={"white"}
        sx={{
          cursor: "pointer",
        }}
      >
        Menu
      </Box>
  
      <Box textAlign={"left"} width={"100%"} pl={1} pr={1}>
        <TextField size="small" id="standard-basic" fullWidth placeholder="Search by location"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FmdGoodIcon className="font-black" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon className="font-black" />
              </InputAdornment>
            ),
          }}
        sx={{paddingTop: "10px", height: "45px",}}
        />
        <Box
          onClick={() => navigate("/")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #e2e2e2", padding: "15px 5px"
          }}
        >
          Home
        </Box>
        <Box
          onClick={() => navigate("/clearedissues")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #000000", padding: "15px 5px"
          }}
        >
          Cleared issues
        </Box>
        {login && <Box
          onClick={() => navigate("/profile")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #e2e2e2", padding: "15px 5px"
          }}
        >
          Profile
        </Box>}
        {login && <Box
          onClick={() => navigate("/saved")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #e2e2e2", padding: "15px 5px"
          }}
        >
          Saved
        </Box>}
        {login && <Box
          onClick={() => navigate("/articles")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #000000", padding: "15px 5px"
          }}
        >
          My Articles
        </Box>}
        <Box
          onClick={() => navigate("/about")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #e2e2e2", padding: "15px 5px"
          }}
        >
          About
        </Box>
        <Box
          onClick={() => navigate("/contact")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #e2e2e2", padding: "15px 5px"
          }}
        >
          Contact us
        </Box>
        {login && <Box
          onClick={() => setConfirmOpen(true)}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #e2e2e2", padding: "15px 5px"
          }}
        >
          Sign out
        </Box>}
      </Box>
      <Box
        textAlign={"center"}
        width={"100%"}
        borderRadius={"2px"}
        mb={1}
        p={1}
        bgcolor={"black"}
        color={"white"}
        sx={{
          cursor: "pointer",
        }}
      >
        Notification
      </Box>

      <ConfirmModal confirmOpen={confirmOpen} setConfirmOpen={setConfirmOpen} onClick={() => {googleLogout(); signOut()}}>Are you sure to sign out?</ConfirmModal>
    </Grid>
  );
};

export default Notification;
