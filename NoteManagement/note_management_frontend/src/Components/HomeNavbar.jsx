import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Navbar, Nav, NavbarToggle } from "react-bootstrap";
import logo from "../images/navLogo.svg";
import "../Style/App.css";
import "../Style/HomeNavbar.css";
// import "../Style/HomeNavbar.scss";

export default function HomeNavbar() {
  const url = window.location.pathname;

  useEffect(() => {
    if (url === "/login") {
      document.getElementById("login").style.display = "none";
    } else if (url === "/signup") {
      document.getElementById("signup").style.display = "none";
    }
  }, [url]);

  return (
    <Navbar
      bg="dark"
      expand="lg"
      className="mb-4 p-lg-2 border-bottom border-2 position-sticky"
    >
      <div className="container-fluid">
        <Nav.Item>
          <Navbar.Brand>
            <Link to="/">
              <img src={logo} height="50%" width="50%" alt="" />
            </Link>
          </Navbar.Brand>
        </Nav.Item>
        <Nav.Item>
          <NavbarToggle className="border-0">
            <button
              className="navbar-toggler text-light border-0 me-0"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <FontAwesomeIcon icon={faBars} className="text-light zoom" />
            </button>
          </NavbarToggle>
        </Nav.Item>
        <Nav.Item>
          <Navbar.Collapse id="basic-navbar-nav" className="border-0">
            <Nav className="ms-auto">
              <Nav.Link className="focus-selector" id="login">
                <Link
                  className="nav-link text-light ps-lg-3 pe-lg-3 fw-semibold fs-4 fs-5"
                  to="/login"
                >
                  Login
                </Link>
              </Nav.Link>
              <Nav.Link className="focus-selector" id="signup">
                <Link
                  className="nav-link text-light fw-semibold fs-4 fs-5"
                  to="/signup"
                >
                  Signup
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Nav.Item>
      </div>
    </Navbar>
  );
}
