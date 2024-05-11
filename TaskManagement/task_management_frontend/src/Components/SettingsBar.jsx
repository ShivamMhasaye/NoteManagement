import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { settingsBar } from "../data/settingsBarData";
import "../Style/NotesHome.css";

export default function SettingsBar(props) {
  const handleMouseOver = (e) => {
    e.currentTarget.style.backgroundColor = props.isDark
      ? "rgb(255, 255, 255)"
      : "rgb(0, 0, 0)";
    e.currentTarget.style.color = props.isDark
      ? "rgb(0,0,0)"
      : "rgb(255, 255, 255)";
  };

  const handleMouseOut = (e) => {
    e.currentTarget.style.backgroundColor = "transparent";
    e.currentTarget.style.color = props.isDark ? "#f8f9fa" : "#212529";
  };

  return (
    <Navbar
      className={
        "border-bottom border-1 " + (props.isDark ? "bg-dark " : "bg-light")
      }
    >
      <div
        className={
          "offset-0 container pt-2 pb-2 ps-4 pe-4 col-3 ms-0 " +
          (props.isDark ? "text-light" : "text-dark")
        }
      >
        {settingsBar.map((setting) => (
          <Nav.Item
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            onClick={props.handleBoldClick}
            className="p-1 rounded-2"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title={setting.title}
            role="button"
            key={setting.title}
          >
            {setting.icon}
          </Nav.Item>
        ))}
      </div>
    </Navbar>
  );
}
