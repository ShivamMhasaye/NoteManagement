import React, { useEffect, useState } from "react";
import axios from "axios";
import AddNoteButton from "./AddNoteButton";
import { endpoints } from "../utils/Constants";

export default function ArchiveNotes(props) {
  const username = "adarsh";
  // const username = useSelector((state) => state.username.value);

  const [data, setData] = useState([]);

  useEffect(() => {
    setData([axios.get(`${endpoints.getAllNotes}/${username}/archive`)]);
  }, []);
  return (
    <>
      <div>Archive</div>
      <AddNoteButton isDark={props.isDark} />
    </>
  );
}
