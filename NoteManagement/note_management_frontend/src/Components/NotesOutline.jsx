import React, { useState } from "react";
import { FaTrashRestore } from "react-icons/fa";
import { FaTrash, FaUserPlus } from "react-icons/fa6";
import { BiSolidArchiveIn, BiSolidArchiveOut } from "react-icons/bi";
import axios from "axios";
import { endpoints } from "../utils/Constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../Style/NotesHome.css";

export default function NotesOutline(props) {
  const url = window.location.pathname;
  const [isHovering, setIsHovering] = useState(false);
  const id = useState(props.id);
  // const [data, setData] = useState(props.);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleArchiveClick = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.patch(`${endpoints.updateNotes}/${id}`, {
        location: "archive",
      });
      console.log(response.data);
      toast.success(`Note with title ${response.data.title} archived.`);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
    // props.fetchData();
  };

  const handleNonArchiveClick = async (e) => {
    e.stopPropagation();
    try {
      console.log(url);
      const response = await axios.patch(
        `${endpoints.updateNotes}/${id}`,
        {
          location: "main",
        }
      );
      console.log(response.data);
      toast.success(`Note with title ${response.data.title} moved to notes`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleCollaboratorClick = (e) => {
    e.stopPropagation();
  };

  const handleTrashClick = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.patch(
        `${endpoints.updateNotes}/${id}`,
        {
          location: "trash",
        }
      );
      console.log(response.data);
      toast.success(`Note with title ${response.data.title} moved to trash`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleNonTrashClick = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.patch(
        `${endpoints.updateNotes}/${id}`,
        {
          location: "main",
        }
      );
      console.log(response.data);
      toast.success(`Note with title ${response.data.title} moved to notes`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    try {
      const response = await axios.delete(
        `${endpoints.deleteNotes}/${id}`
      );
      toast.success(`Note Deleted`);
      console.log(response.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // useEffect(() => {

  // }, [handleArchiveClick]);

  return (
    <>
      <div
        className={
          "p-2 border border-1 position-relative " +
          (props.isDark
            ? "text-light note-dimensions"
            : "text-dark note-dimensions-light")
        }
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className="row notes-title">
          <div className="col-12">{props.title}</div>
        </div>
        <div className="row">
          <div className="col-12">{props.content}</div>
        </div>
        {isHovering && (
          <div className="row position-absolute placement-icons">
            {props.location === "archive" && (
              <div className="col text-center">
                <BiSolidArchiveOut
                  size={20}
                  onClick={handleNonArchiveClick}
                  role="button"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Remove From Archive"
                />
              </div>
            )}
            {props.location === "main" && (
              <div className="col text-center">
                <BiSolidArchiveIn
                  size={20}
                  onClick={handleArchiveClick}
                  role="button"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Add To Archive"
                />
              </div>
            )}
            {props.location !== "trash" && (
              <div className="col text-center">
                <FaUserPlus
                  size={20}
                  onClick={handleCollaboratorClick}
                  role="button"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Add Collaborator"
                />
              </div>
            )}
            {props.location === "trash" && (
              <div className="col text-center">
                <FaTrash
                  size={20}
                  onClick={handleDeleteClick}
                  role="button"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Delete Permanently"
                />
              </div>
            )}
            <div className="col text-center">
              {props.location !== "trash" ? (
                <FaTrash
                  size={20}
                  onClick={handleTrashClick}
                  role="button"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Move to Trash"
                />
              ) : (
                <FaTrashRestore
                  size={20}
                  onClick={handleNonTrashClick}
                  role="button"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Restore Note"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
