import React, { useEffect } from "react";
import LoginForm from "../Components/LoginForm";
import HomeNavbar from "../Components/HomeNavbar";
import setBodyColor from "../utils/setBodyColor";
import "../Style/Login.css";

export default function Login() {
  const bgColor = "#283044";

  useEffect(() => {
    setBodyColor(bgColor);
  }, [bgColor]);

  return (
    <>
      <HomeNavbar />
      <div className="col">
        <div className="row m-0">
          <div className="offset-1 offset-md-2 offset-xl-3 col-10 col-md-8 col-xl-6">
            {/* <div className="offset-3 mb-3 mt-3">
            <Link to="/">
            <img src={logo} height="30%" width="70%" className="" alt="" />
            </Link>
          </div> */}
            <div>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
