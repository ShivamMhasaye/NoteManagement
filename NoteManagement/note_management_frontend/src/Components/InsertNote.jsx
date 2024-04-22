import React, { useState, useRef } from "react";
import SettingsBar from "./SettingsBar";
import ContentEditable from "react-contenteditable";
// import sanitizeHTML from "sanitize-html";
// import { useDispatch } from "react-redux";
import { updateNotes } from "../App/reducers/notesSlice";
import axios from "axios";
import "../Style/InsertNote.css";
import { endpoints } from "../utils/Constants";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function InsertNote(props) {
  const [title, setTitle] = useState(
    props.title ? props.title : "Untitled Note"
  );
  const url = props.url;
  const inputRef = useRef();
  // const dispatch = useDispatch();
  const username = localStorage.getItem("username");
  const [_id, set_id] = useState(props._id ? props._id : "");
  // const [selectedText, setSelectedText] = useState("");
  // const typingTimer = useRef(null);
  const [content, setContent] = useState(props.content ? props.content : "");
  const [isUpdate, setIsUpdate] = useState(
    url.includes("updatenote") ? true : false
  );

  // const notes = useSelector((state) => state.notes);

  // const [sanitizeConf, setSanitizeConf] = useState({
  //   allowedTags: [
  //     "b",
  //     "i",
  //     "em",
  //     "strong",
  //     "a",
  //     "p",
  //     "span",
  //     "ol",
  //     "li",
  //     "ul",
  //     "br",
  //     "img",
  //   ],
  //   allowedAttributes: { a: ["href"] },
  // });

  const handleInput = (e) => {
    // e.preventDefault();
    switch (e.currentTarget.id) {
      case "title":
        setTitle(e.target.value);
        console.log(e);
        // dispatch(
        //   updateNotes({ title: e.currentTarget.value, content: content })
        // );
        // console.log("content title");
        console.log(title);
        break;
      case "content":
        // dispatch(
        //   updateNotes({ content: e.currentTarget.innerHTML, title: title })
        // );
        setContent(e.currentTarget.innerHTML);
        // console.log("content");
        console.log(content);
        break;
      default:
        break;
    }
    console.log(title, content);
    // typingTimer.current = setTimeout((e) => {
    //   handleUpdate(); // Call the update API here
    // }, 2000);
  };

  //Try to add tab space
  const handleTabPress = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      e.currentTarget.focus();
      // dispatch(updateNotes({ title: title, content: content }));
    }
  };

  const handleBoldClick = (e) => {
    e.preventDefault();
    // inputRef.
    // const selectedText = this.state.inputRef.substring(cursorStart, cursorEnd);
    // const fontWeightRegex = /font-weight:\s*700\s*;/i;
    // const isFontWeight700 = fontWeightRegex.test(selectedText);
    // console.log(isFontWeight700);
    // setSelectedText(`<span class="fw-bold">${selectedText}</span>`)
    // if(isFontWeight700){
    //   setSelectedText(selectedText)
    // }
    // const newContent = `<b>${selectedText}</b>`;
    // setContent(prevText + newContent + nextText);
    // dispatch(
    //   updateNotes({
    //     title: title,
    //     content: `${prevText}${newContent}${nextText}`,
    //   })
    // );
    // console.log(selectedText);
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      const reqBody = {
        username: username,
        title: title,
        content: content,
        location: "main",
        collaborator: "",
      };
      const response = await axios.post(endpoints.insertNote, reqBody);
      set_id(response.data._id);
      setIsUpdate(true);
      toast.success("Note Saved");
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(inputRef.current.select());

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedData = {
        title: title,
        content: content,
      };
      await axios.patch(
        `${endpoints.updateNotes}/${_id}`,
        updatedData
      );
      toast.success("Note Updated");
    } catch (err) {
      console.log(err);
          }
  };

  // const handleSelectedText = () => {
  //   console.log(window.getSelection().toString());
  //   if (window.getSelection().toString())
  //     return setSelectedText(window.getSelection().toString());
  //   else return null;
  // };

  // const handleSelect = (e) => {
  //   console.log(e);
  // };

  //"<div class=\"border border-1 rounded editable border-light text-light\" id=\"content\" contenteditable=\"true\">Chirag</div>"

  // const sanitizeInput = () => {
  //   setContent(sanitizeHTML(content, sanitizeConf));
  //   // console.log(content);
  // };

  // const handleBlur = () => {
  //   console.log("Blur event - Content saved", content);
  // };

  // const handleFocusOff = () => {
  //   dispatch(updateNotes(content));
  // };

  // ERROR - cannot use react hooks inside a callback
  // useEffect(() => {
  //   useSelector((state) => {
  //     console.log(state.notes);
  //   });
  // }, [useSelector]);

  return (
    <>
      <div className="row m-0 p-0">
        <SettingsBar handleBoldClick={handleBoldClick} isDark={props.isDark} />
      </div>
      <div className="row m-0 p-0">
        <form
          onSubmit={
            isUpdate || url.includes("updatenote") ? handleUpdate : handleInsert
          }
        >
          <div className="row m-0 p-0 mt-5">
            <input
              type="text"
              className={
                "bg-transparent fs-3 " +
                (props.isDark
                  ? "text-light title-input"
                  : "text-dark title-input-light")
              }
              placeholder="Enter Title"
              value={title}
              onChange={handleInput}
              id="title"
            />
          </div>
          <div className="row m-0 p-0 mt-5 mh-100">
            <ContentEditable
              className={
                "border border-1 rounded editable " +
                (props.isDark
                  ? "border-light text-light"
                  : "text-dark border-dark")
              }
              ref={inputRef}
              onChange={handleInput}
              html={content}
              id="content"
              suppressContentEditableWarning={true}
              onKeyDown={handleTabPress}
              // onMouseUpCapture={handleSelectedText}
            />
          </div>

          <button
            className={
              "btn mt-2 float-end " +
              (props.isDark ? "btn-warning" : "btn-primary")
            }
          >
            {isUpdate || url.includes("updatenote")
              ? "Update Note"
              : "Save Note"}
          </button>
        </form>
      </div>
          </>
  );
}
