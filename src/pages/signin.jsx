import { Box, Container, Paper, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from "react-router-dom";
import { loginDetails } from "../components/loginDetails";
import { GoogleLogin, googleLogout, useGoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";


const SignIn = () => {

  const navigate = useNavigate();

  const userEmailRef = useRef('')

  const login  = loginDetails.login

  useEffect(()=>{
    login && navigate('/')
  },[login ,navigate])


  function signButton(e){
    e.preventDefault()
    const userDetails = {
      name: userEmailRef.current.value.split('@')[0],
      email: userEmailRef.current.value,
      login: true
    }
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
    navigate(0)
  }

  const storedValue = JSON.parse(localStorage.getItem('userDetails'));


  const googleLogin = useGoogleLogin({
    onSuccess: codeResponse => {console.log(codeResponse)},
    flow: 'auth-code',
  });

  return (
    <Container maxWidth="sm">
      <Box mt={18} textAlign={"center"}>
      <Paper elevation={3} sx={{
        height: '60vh',
        padding: '5vh',
        boxSizing: 'border-box'
      }}>
        <p className="sub-heading font-600 text-center">Welcome back</p><br/>
        <form onSubmit={signButton}>
            <TextField
              fullWidth
              required
              inputRef={userEmailRef}
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
              <button onClick={()=>navigate(-1)} type="button" className="reset">
                back
              </button>
            </Box>
            </form>
            <Box mt={8}>
            <div style={{width: '180px'}}>
              </div>
              <button type="submit" className="button" onClick={() => googleLogin()}>
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
