import { Box, InputAdornment, SwipeableDrawer, TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router';
import { loginDetails } from '../loginDetails';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import SearchIcon from '@mui/icons-material/Search';

const MobileMenu = ({open = false, setOpen }) => {

  const navigate = useNavigate();
  const login  = loginDetails.login;

  return (
    <>
    <SwipeableDrawer
      anchor={"right"}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(false)}
    >
      <Box p={1} sx={{width: "35vh", height: "100vh" }} role="presentation">
        {!login && <Box flex={'row'} textAlign={"center"} sx={{padding: "15px 5px"}}>
          <button onClick={()=> navigate('/signin')} className="button">sign in</button>
          <button onClick={()=> navigate('/signup')} className="button">sign up</button>
        </Box>}
        <Box textAlign={"left"}>
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
  
      <Box textAlign={"left"} width={"100%"}>
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
          Your Articles
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
          onClick={() => navigate("/out")}
          sx={{
            cursor: "pointer", borderBottom : "1px solid #e2e2e2", padding: "15px 5px"
          }}
        >
          Sign out
        </Box>}
      </Box>
        </Box>
      </Box>
    </SwipeableDrawer>
  </>
  )
}

export default MobileMenu