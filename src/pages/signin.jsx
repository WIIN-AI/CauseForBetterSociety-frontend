import { Box, Container, Paper, TextField } from "@mui/material";
import React, { useEffect, useRef } from "react";
import GoogleIcon from '@mui/icons-material/Google';
import { Link, useNavigate } from "react-router-dom";
import { loginDetails } from "../components/loginDetails";
import { useGoogleLogin } from "@react-oauth/google";

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
    flow: "auth-code",
    onSuccess: async codeResponse => {
        // console.log(codeResponse);
        const tokens = await fetch(`${process.env.REACT_APP_API}/auth/google/`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                'code': codeResponse.code,
            })
          })

        const data = await tokens.json();
        // console.log(data)
        if (data.email_verified){
            const userDetails = {
              name: data.name,
              email: data.email,
              login: data.email_verified,
              picture : data.picture
            }
          localStorage.setItem('userDetails', JSON.stringify(userDetails));
          navigate(0)
        }

        // const userDetails = {
        //   name: userEmailRef.current.value.split('@')[0],
        //   email: userEmailRef.current.value,
        //   login: true
        // }
        // localStorage.setItem('userDetails', JSON.stringify(userDetails));
        // navigate(0)


        // const tokens = await fetch(`https://oauth2.googleapis.com/token`, {
        //     method: "POST",
        //     body: JSON.stringify({
        //       'code': codeResponse.code,
        //       'client_id': '782661790171-6vqudk01fu4sajid0huvbr3d4qu29cv7.apps.googleusercontent.com',
        //       'client_secret': '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',
        //       'redirect_uri': 'http://localhost:3000',
        //       'grant_type': 'authorization_code'
        //     }),
        // });
        // const result = await tokens.json();
        // console.log("Success:", result);
    }
})

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
