import React from "react";
import { Link } from "react-router-dom";
import {loginDetails} from './../../components/loginDetails'


const Navbar = () => {
  const login  = loginDetails.login

  return (
    <nav
      className="flex center"
      style={{
        justifyContent: "space-between",
        padding: "0 30px",
        height: "50px",
        border: "1px solid #e2e2e2",
        backgroundColor: "#ffffff90",
        backdropFilter: "blur(30px)",
        borderStyle: "hidden hidden solid hidden",
        position: "fixed",
        zIndex: 100,
        width: "100%",
        top: 0,
      }}
    >
      <Link className="link" to={"/"}>
        <div className="font-800 medium">C.F.B.S</div>
      </Link>
      <div>
        {!login && <button className="button">sign in</button>}
        {!login && <button className="button">sign up</button>}

        {login && <Link className="link" to={"/create"}>
          <button className="button">write</button>
        </Link>}
        
      </div>
    </nav>
  );
};

export default Navbar;
