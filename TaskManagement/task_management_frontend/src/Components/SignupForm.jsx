/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaLock, FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { BsCalendar2DateFill } from "react-icons/bs";
import { endpoints } from "../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupForm() {
  const navigate = useNavigate();
  const initialValues = {
    username: "",
    email: "",
    password: "",
    dob: "",
    rePassword: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});
  // const [isSubmit, setIsSubmit] = useState(false);
  const getFormattedDate = (date) => {
    const year = date.getFullYear() - 5;
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const maxDate = useState(getFormattedDate(new Date()));

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  // const validate = (formValues) => {
  //   const errors = {};
  //   const usernameRegex = /^(?=.{6,20}$)[a-zA-Z0-9]+$/;
  //   const passwordRegex =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()])(.{8,20})$/;
  //   if (!formValues.username) {
  //     errors.username = "Username is required";
  //   } else if (formValues.username.length < 6) {
  //     errors.username = "Username must be more than 6 characters";
  //   } else if (!usernameRegex.test(formValues.username)) {
  //     errors.username = "Username cannot contain any special characters";
  //   } else if (formValues.username.length > 20) {
  //     errors.username = "Username cannot exceed more than 20 characters";
  //   }
  //   if (!formValues.password) {
  //     errors.password = "Password is required";
  //   } else if (formValues.password.length < 8) {
  //     errors.password = "Password must be more than 8 characters";
  //   } else if (!passwordRegex.test(formValues.password)) {
  //     errors.password =
  //       "Password must contain a capital letter, a small letter, a number and a special character";
  //   } else if (formValues.password.length > 20) {
  //     errors.password = "Password cannot exceed more than 20 characters";
  //   }
  //   if (!formValues.email) {
  //     errors.password = "Email is required";
  //   }
  //   if (!formValues.dob) {
  //     errors.dob = "Date of Birth is required";
  //   }
  //   return errors;
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setFormErrors(validate(formValues));
    // setIsSubmit(true);
    console.log(formValues);
    let response;
    try {
      response = await axios.post(endpoints.signup, formValues);
      console.log(response);
      if (response.status === 200) {
        // localStorage.setItem("token", response.data.token);
        toast.success(`Account Created`);
        navigate("/login", { replace: true });
      } else {
        const err = { Error: response.statusText.error };
        throw err;
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-group border border-4 border-dark rounded rounded-4 p-3 bg-light-blue mt-4"
    >
      <div className="text-center fw-bold fs-2 mt-2">Become A Member</div>
      <div className="row"></div>
      <div className="row">
        <label htmlFor="u1sername" className="form-label mt-2 fs-5">
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
            value={formValues.username}
            onChange={handleInput}
            placeholder="Enter Username"
          />
        </div>
      </div>
      <div className="row"></div>
      <div className="row">
        <label htmlFor="password" className="form-label mt-2 fs-5">
          Password<span className="text-danger">*</span>
        </label>
        <div className="input-group">
          <div className="input-group-text">
            <FaLock />
          </div>
          <input
            className="form-control"
            placeholder="Enter Password"
            // type={showPassword ? "text" : "password"}
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="row"></div>
      <div className="row">
        <label htmlFor="rePassword" className="form-label mt-2 fs-5">
          Re-Type Password<span className="text-danger">*</span>
        </label>
        <div className="input-group">
          <div className="input-group-text">
            <FaLock />
          </div>
          <input
            className="form-control"
            placeholder="Re-Type Password"
            type="password"
            id="rePassword"
            name="rePassword"
            value={formValues.rePassword}
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="row"></div>
      <div className="row">
        <label htmlFor="email" className="form-label mt-2 fs-5">
          Email<span className="text-danger">*</span>
        </label>
        <div className="input-group">
          <div className="input-group-text">
            <MdEmail />
          </div>
          <input
            className="form-control"
            placeholder="Enter Email"
            type="email"
            id="email"
            name="email"
            value={formValues.email}
            onChange={handleInput}
          />
        </div>
      </div>
      <div className="row"></div>
      <div className="row">
        <label htmlFor="dob" className="form-label mt-2 fs-5">
          Date of Birth<span className="text-danger">*</span>
        </label>
        <div className="input-group">
          <div className="input-group-text">
            <BsCalendar2DateFill />
          </div>
          <input
            className="form-control"
            type="date"
            id="dob"
            name="dob"
            value={formValues.dob}
            onChange={handleInput}
            max={maxDate}
          />
        </div>
      </div>
      <button type="submit" className="offset-5 btn btn-primary mt-2 fs-5">
        SignUp
      </button>
    </form>
  );
}
