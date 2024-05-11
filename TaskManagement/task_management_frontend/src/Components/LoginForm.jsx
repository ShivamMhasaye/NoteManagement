import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa6";
// import { useDispatch } from "react-redux";
import { login } from "../App/reducers/usernameSlice";
import { endpoints } from "../utils/Constants";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import loginLeft from "../images/login-left.json";
import loadingAnimation from "../images/loading-animation.json";
import accountCreated from "../images/account-crated.json"
import "react-toastify/dist/ReactToastify.css";

export default function LoginForm() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const lottieRef = useRef();
  const usernamePlaceholder = "Enter Username";
  const passwordPlaceholder = "Enter Password";

  const handleTogglePassword = () => {
    setIsVisible(!isVisible);
  };

  const handleInput = (e) => {
    switch (e.target.id) {
      case "username":
        setUsername(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      default:
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reqBody = {
      username: username,
      password: password,
    };
    document.getElementById("loginForm").style.display = "none";
    lottieRef.current.setSpeed(0.6);
    document.getElementById("loading").style.display = "block";
    try {
      console.log(reqBody);
      console.log(endpoints.login);
      const response = await axios.post(endpoints.login, reqBody);
      console.log(response);
      if (response.data.accessToken) {
        // dispatch(
        //   login({
        //     username: reqBody.username,
        //     token: response.data.accessToken,
        //   })
        // );
        localStorage.setItem("JWTToken", response.data.accessToken);
        localStorage.setItem("username", reqBody.username);
        navigate("/userid/home", { replace: true });
      } else {
        document.getElementById("loading").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        const err = { Error: "Internal Server Error" };
        throw err;
      }
    } catch (err) {
      document.getElementById("loading").style.display = "none";
      document.getElementById("loginForm").style.display = "block";
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleSignUp = () => {
    navigate("/signup", { replace: true });
  };

  return (
    <>
      <div id="loading" style={{ display: "none" }}>
        <Lottie
          animationData={loadingAnimation}
          loop={true}
          lottieRef={lottieRef}
        />
      </div>
      <form
        onSubmit={handleSubmit}
        id="loginForm"
        style={{ display: "block" }}
        className="form-group border border-4 border-dark rounded rounded-2 bg-light-blue"
      >
        <div className="row p-0 m-0">
          <div className="d-lg-flex d-none col-lg-4 col-0 p-0 m-0 login-side-image justify-contents-center">
            <Lottie animationData={loginLeft} loop={true} />
          </div>
          <div className="col-12 col-lg-8 p-3">
            <div className="row">
              <div className="col-12 fw-bold fs-1 text-center">
                Welcome Back
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
                  type={isVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  onChange={handleInput}
                  value={password}
                  placeholder={passwordPlaceholder}
                />
                <span
                  className="input-group-btn p-2 bg-light rounded-end"
                  role="button"
                  title="View Password"
                  onClick={handleTogglePassword}
                >
                  {isVisible ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-6 fs-6 mt-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember Me
                  </label>
                </div>
              </div>
              <div className="col-sm-6 fs-6 mt-3">
                <Link
                  to={endpoints.forgotPassword}
                  className="float-end text-primary"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button
                  type="submit"
                  className="btn btn-primary px-4 text-center mt-4 offset-5 mb-2"
                >
                  Login
                </button>
              </div>
            </div>
            <div className="row">
              <div className="col-12 fs-6">
                <span onClick={handleSignUp}>
                  Yet to become a member?&nbsp;
                  <Link to="/signup">SignUp</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
