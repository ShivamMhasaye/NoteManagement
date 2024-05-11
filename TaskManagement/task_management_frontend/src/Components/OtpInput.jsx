import React, { useState } from "react";
import HomeNavbar from "./HomeNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const OtpInput = () => {
  const { state } = useLocation();
  // const [OTPInput, setOTPInput] = useState([0, 0, 0, 0]);
  const [OTPInput1, setOTPInput1] = useState(0);
  const [OTPInput2, setOTPInput2] = useState(0);
  const [OTPInput3, setOTPInput3] = useState(0);
  const [OTPInput4, setOTPInput4] = useState(0);
  const navigate = useNavigate();

  // const handleComplete = (otp) => {
  //   console.log("Entered OTP: ", otp);
  // };

  // const handleChange = (index, value) => {
  //   setOTPInput(...OTPInput, [index]: value);
  // }

  const handleSubmit = (e) => {
    console.log(state.OTP);
    e.preventDefault();
    if (state.OTP === null) {
      toast.success(`No OTP generated!`);
      navigate("/forgotpassword", { replace: true });
    }
    console.log(OTPInput1, OTPInput2, OTPInput3, OTPInput4);
    console.log(OTPInput1 + "" + OTPInput2 + "" + OTPInput3 + "" + OTPInput4);
    const userOTP =
      OTPInput1 + "" + OTPInput2 + "" + OTPInput3 + "" + OTPInput4;
    if (userOTP === state.OTP) {
      navigate(
        "/resetpassword",
        { state: { username: state.username } },
        { replace: true }
      );
    } else {
      toast.error("The code you have entered is not correct");
      return;
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
                <div className="col-12 fw-bold fs-1 text-center">Enter OTP</div>
              </div>
              <div className="row mb-3">
                {/* <OtpComponent onComplete={handleComplete} /> */}
                <div className="col">
                  <input
                    maxLength="1"
                    className="m-2 text-center form-control rounded"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => {
                      setOTPInput1(e.target.value);
                    }}
                  />
                </div>
                <div className="col">
                  <input
                    maxLength="1"
                    className="m-2 text-center form-control rounded"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => {
                      setOTPInput2(e.target.value);
                    }}
                  />
                </div>
                <div className="col">
                  <input
                    maxLength="1"
                    className="m-2 text-center form-control rounded"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => {
                      setOTPInput3(e.target.value);
                    }}
                  />
                </div>
                <div className="col">
                  <input
                    maxLength="1"
                    className="m-2 text-center form-control rounded"
                    type="text"
                    name=""
                    id=""
                    onChange={(e) => {
                      setOTPInput4(e.target.value);
                    }}
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Verify Account
              </button>
            </div>
          </form>
        </div>
      </div>
          </>
  );
};

export default OtpInput;
