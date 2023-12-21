import { GoogleLogin } from "@react-oauth/google";

const clientId =
  "782661790171-ekenre4fc5mr7fjuqtogvrp9k8ur0i4b.apps.googleusercontent.com";

function Login() {
  return (
    <>
      <GoogleLogin
        clientId={clientId}
        buttonText = "Login"
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        cookiePolicy={'single_host_origin'}
        isSignedIn= {true}
      />
    </>
  );
}


export default Login