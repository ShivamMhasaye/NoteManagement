import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaNoteSticky,
  FaBoxArchive,
  FaTrashCan,
} from "react-icons/fa6";
import "../Style/NotesHome.css";

export default function NotesHomeSidebar(props) {
  const navigate = useNavigate();

  const iconStyles = {
    color: "#EEE5E9",
    fontSize: "1.25rem",
  };

  const iconStylesLight = {
    color: "#111A16",
    fontSize: "1.25rem",
  };

  const handleHomeClick = () => {
    navigate("/userid/home", { replace: true });
  };

  const handleArchiveClick = () => {
    navigate("/userid/archive", { replace: true });
  };

  const handleTrashClick = () => {
    navigate("/userid/trash", { replace: true });
  };

  return (
    <>
      <div
        className={
          "container-fluid h-100 m-0 p-0 " +
          (props.isDark ? "bg-dark" : "bg-light")
        }
      >
        <div
          className={
            "row m-0 p-0 ps-3 pt-3 pb-3 " +
            (props.isDark ? "focus-selector" : "focus-selector-light")
          }
          role="button"
          onClick={handleHomeClick}
        >
          <NavLink
            className={
              "nav-link fw-semibold fs-5 " +
              (props.isDark ? " text-light" : "text-dark")
            }
          >
            <span>
              <FaNoteSticky
                style={props.isDark ? iconStyles : iconStylesLight}
              />
            </span>
            &emsp;
            <span
              className={props.isDark ? "font-yellow" : "font-yellow-light"}
            >
              Notes
            </span>
          </NavLink>
        </div>
        <div
          className={
            "row m-0 p-0 ps-3 pt-3 pb-3 " +
            (props.isDark ? "focus-selector" : "focus-selector-light")
          }
          onClick={handleArchiveClick}
          role="button"
        >
          <NavLink className="nav-link text-light fw-semibold fs-5">
            <FaBoxArchive style={props.isDark ? iconStyles : iconStylesLight} />
            &emsp;
            <span
              className={props.isDark ? "font-yellow" : "font-yellow-light"}
            >
              Archive
            </span>
          </NavLink>
        </div>
        <div
          className={
            "row m-0 p-0 ps-3 pt-3 pb-3 " +
            (props.isDark ? "focus-selector" : "focus-selector-light")
          }
          onClick={handleTrashClick}
          role="button"
        >
          <NavLink className="nav-link text-light fw-semibold fs-5">
            <FaTrashCan style={props.isDark ? iconStyles : iconStylesLight} />
            &emsp;
            <span
              className={props.isDark ? "font-yellow" : "font-yellow-light"}
            >
              Trash
            </span>
          </NavLink>
        </div>
      </div>
    </>
  );
}
