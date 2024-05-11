import React from "react";
import {
  FaSquareFacebook,
  FaSquareGithub,
  FaSquareInstagram,
  FaSquareWhatsapp,
  FaSquareXTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="container-fluid bg-dark text-light p-5 border-top">
      <div className="row">
        <div className="col-12 col-lg-4 d-flex align-items-center fs-5">
          InLine &copy; 2024
        </div>
        <div className="offset-lg-4 col-12 col-lg-4 d-flex justify-contents-end">
          <ul className="col-12 justify-content-end list-unstyled d-flex text-light">
            <li className="ms-3">
              <Link className="text-light" to="#">
                <FaSquareXTwitter role="button"/>
              </Link>
            </li>
            <li className="ms-3">
              <Link className="text-light" to="#">
                <FaSquareInstagram />
              </Link>
            </li>
            <li className="ms-3">
              <Link className="text-light" to="#">
                <FaSquareFacebook />
              </Link>
            </li>
            <li className="ms-3">
              <Link className="text-light" to="#">
                <FaSquareWhatsapp />
              </Link>
            </li>
            <li className="ms-3">
              <Link className="text-light" to="#">
                <FaSquareGithub />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
