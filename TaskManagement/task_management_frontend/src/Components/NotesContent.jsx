import React, { useEffect, useState } from "react";
// import { fakeNotesRepo } from "../data/fakeNotesRepo";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NotesOutline from "./NotesOutline";
import { endpoints } from "../utils/Constants";
import AddNoteButton from "./AddNoteButton";

export default function NotesContent(props) {
  // const _id = useSelector((state) => state.notesId.value);

  const [data, setData] = useState([]);
  const username = localStorage.getItem("username");
  const location = props.url.includes("home")
    ? "main"
    : props.url.includes("archive")
    ? "archive"
    : "trash";
  // const username = "adarsh";
  const navigate = useNavigate();

  const fetchContentBody = (content) => {
    const regex = /(<([^>]+)>)/gi;
    let contentBody = content.replaceAll(regex, "");
    const regex1 = /\&nbsp;/g;
    contentBody = contentBody.replaceAll(regex1, "");
    return contentBody.length > 50
      ? contentBody.substring(0, 50) + "..."
      : contentBody;
  };

  const fetchTitle = (title) => {
    return title.length > 8 ? title.substring(0, 8) + ".." : title;
  };

  const handleNoteClick = async (event, id) => {
    // event.stopPropagation();
    console.log(event.currentTarget);
    try {
      const response = await axios.get(`${endpoints.getNote}/${id}`);
      console.log(response);
      navigate("/userid/updatenote", {
        state: {
          title: response.data.title,
          content: response.data.content,
          _id: response.data._id,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${endpoints.getAllNotes}/${username}/${location}`
      );
      setData(response.data);
      // props.handleNoNote(false);
      console.log(data);
    } catch (err) {
      // props.handleNoNote(true);
      console.log(err);
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = props.bgColor;
    fetchData();
  }, [location, props.bgColor]);

  return (
    <>
      {data.map((dataItems) => (
        <div
          className="m-0 p-0"
          key={dataItems._id}
          onClick={(event) => handleNoteClick(event, dataItems._id)}
        >
          <NotesOutline
            title={fetchTitle(dataItems.title)}
            content={fetchContentBody(dataItems.content)}
            id={dataItems._id}
            isDark={props.isDark}
            location={location}
          />
        </div>
      ))}
      <AddNoteButton isDark={props.isDark} />
    </>
  );
}
