import { Box, Container, Paper, TextField } from "@mui/material";
import React, { useEffect } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from "react-router-dom";
import { loginDetails } from "../components/loginDetails";

const SignIn = () => {

  const navigate = useNavigate();

  const login  = loginDetails.login

  useEffect(()=>{
    login && navigate('/')
  },[login ,navigate])

  return (
    <Container maxWidth="sm">
      <Box mt={18} textAlign={"center"}>
      <Paper elevation={3} sx={{
        height: '60vh',
        padding: '5vh',
        boxSizing: 'border-box'
      }}>
        <p className="sub-heading font-600 text-center">Welcome back</p><br/>
            <TextField
              fullWidth
              required
              type="email"
              label="Email"
              placeholder="type here"
              sx={{
                margin: "10px 0",
              }}
            />

            <TextField
              fullWidth
              required
              type="password"
              label="Password"
              placeholder="type here"
              sx={{
                margin: "10px 0",
              }}
            />

            <Box mt={1.5} >
              <button type="submit" className="button">
                sign in
              </button>
              <button type="button" onClick={'reset'} className="reset">
                sign up
              </button>
            </Box>
            <Box mt={8}>
              <button type="submit" className="button">
              <p style={{display: "flex"}}><GoogleIcon style={{ marginRight: '30px'}}/> <span>Sign in with google</span></p>
              </button>
            </Box><br/><br/>
            <p>No account? <span className="font-700"><Link className="link" to={'/signup'}>Create one</Link></span></p>
      </Paper>
      </Box>

    </Container>
  );
};

export default SignIn;
