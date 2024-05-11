import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const UpdateNote = () => {
  const location = useLocation();
  const [title, setTitle] = useState(location.state.title);
  const [content, setContent] = useState(location.state.content);

  

  useEffect(() => {
    // if (location.state) {
    //   console.log(location.state.title);
    // }
    console.log(location);
  }, []);

  return (
  <div>
  </div>
  );
};

export default UpdateNote;
