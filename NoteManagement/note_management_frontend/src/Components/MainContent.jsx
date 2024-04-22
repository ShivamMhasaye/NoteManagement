import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";
import loginAnimation from "../images/login-left-animation.json";
import { FaArrowCircleUp } from "react-icons/fa";

export default function MainContent() {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };
  const handleClick = () => {
    window.scrollTo({ top: "0", behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="mt-0 pt-0 container rounded bg-light shadow">
        <div className="row mb-5 pb-5 mt-5 pt-5 ps-2">
          <div className="col-md-4 col-12 d-flex flex-column justify-content-center pt-4 pt-md-0 fs-1 fw-semibold text-dark">
            The perfect place for writing your notes
            <span className="fs-6 mt-2">
              InLine is a web-application for note-taking. It comes packed with
              everything you need for your notes. The app works on all the
              devices.
            </span>
          </div>
          <div className="col-md-8 col-12 d-flex justify-content-center">
            <Lottie animationData={loginAnimation} loop={true} />
          </div>
        </div>
      </div>
      {visible && (
        <FaArrowCircleUp
          onClick={handleClick}
          className="text-warning scroll-to-top z-3 float-end me-2"
          size={20}
          role="button"
        />
      )}
    </>
  );
}
