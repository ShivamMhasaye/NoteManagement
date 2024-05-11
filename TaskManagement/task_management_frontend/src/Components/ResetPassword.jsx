import React, { useState } from "react";
import HomeNavbar from "./HomeNavbar";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { FaLock } from "react-icons/fa6";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { endpoints } from "../utils/Constants";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();

  const handleInput = (e) => {
    switch (e.target.id) {
      case "password":
        setPassword(e.target.value);
        break;
      case "rePassword":
        setRePassword(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (state.username === null) {
      toast.error(`Please generate an OTP first`);
      navigate("/forgotpassword", { replace: true });
    }
    if (password === rePassword) {
      try {
        const updatedData = {
          password: password,
        };
        await axios.patch(
          `${endpoints.resetPassword}/${state.username}`,
          updatedData
        );
        toast.success("Password changed successfully");
        navigate("/login", { replace: true });
      } catch (err) {
        console.log(err.message);
      }
    } else {
      toast.error("Passwords do not match");
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
                  Change Password
                </div>
              </div>
              <div className="row">
                <label
                  htmlFor="password"
                  className="form-label m-0 p-0 ms-3 mt-2 fs-5"
                >
                  Password<span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <div className="input-group-text">
                    <FaLock />
                  </div>
                  <input
                    className="form-control"
                    type="password"
                    id="password"
                    name="password"
                    onChange={handleInput}
                    value={password}
                  />
                </div>
              </div>
              <div className="row">
                <label
                  htmlFor="rePassword"
                  className="form-label m-0 p-0 ms-3 mt-2 fs-5"
                >
                  Re-Enter Password<span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <div className="input-group-text">
                    <FaLock />
                  </div>
                  <input
                    className="form-control"
                    type="password"
                    id="rePassword"
                    name="rePassword"
                    onChange={handleInput}
                    value={rePassword}
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

export default ResetPassword;
