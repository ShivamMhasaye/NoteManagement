import React from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
// import { useState } from "react";

const AddNoteButton = (props) => {

  const plusStyle = {
    position: "fixed",
    bottom: "4%",
    right: "2%",
    color: props.isDark ? "yellow" : "#3B60E4",
  };

  return (
    <Link to="/userid/newnote">
      <IoAddCircleOutline
        style={plusStyle}
        size={50}
        className="add-button"
        role="button"
        data-bs-toggle="tooltip"
        data-bs-placement="bottom"
        title="Add A Note"
      />
    </Link>
  );
};

export default AddNoteButton;
