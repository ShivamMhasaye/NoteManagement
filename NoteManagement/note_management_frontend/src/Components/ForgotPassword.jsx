import React, { useState } from "react";
import HomeNavbar from "./HomeNavbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser } from "react-icons/fa6";
import { endpoints } from "../utils/Constants";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  // const [OTP, setOTP] = useState("");
  const usernamePlaceholder = "Enter Username";
  const navigate = useNavigate();

  const handleInput = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (username) {
    //   console.log(OTP);
    //   setOTP(OTP);
    // }
    try {
      if (username) {
        const OTP = Math.floor(Math.random() * 9000 + 1000);
        const response = await axios.post(`${endpoints.forgetPassword}/${username}`, {
          OTP: OTP,
        });
        console.log(OTP);
        if (response.data) {
          navigate("/otp", { state: { OTP, username } }, { replace: true });
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <HomeNavbar />
      <div className="offset-1 offset-md-2 offset-xl-3 col-10 col-md-8 col-xl-6">
        <div className="form-group border border-4 border-dark rounded rounded-2 bg-light-blue">
          <form onSubmit={handleSubmit}>
            <div className="col-12 offset-lg-2 col-lg-8 p-3">
              <div className="row">
                <div className="col-12 fw-bold fs-1 text-center">
                  Reset Password
                </div>
              </div>
              <div className="row">
                <label
                  htmlFor="username"
                  className="form-label m-0 p-0 ms-3 mt-2 fs-5"
                >
                  Username<span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <div className="input-group-text">
                    <FaUser />
                  </div>
                  <input
                    className="form-control"
                    type="text"
                    id="username"
                    name="username"
                    onChange={handleInput}
                    value={username}
                    placeholder={usernamePlaceholder}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button
                    type="submit"
                    className="btn btn-primary px-4 text-center mt-4 offset-5 mb-2"
                  >
                    Reset Password
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
