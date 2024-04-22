import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useLocation } from "react-router-dom";
import NotesHomeNavbar from "../Components/NotesHomeNavbar";
import NotesHomeSidebar from "../Components/NotesHomeSidebar";
import NotesContent from "../Components/NotesContent";
import InsertNote from "../Components/InsertNote";
import "../Style/NotesHome.css";
import "../index.css";

export default function Users() {
  const url = window.location.pathname;
  let container = useRef(null);
  const darkBackground = "#000000";
  const lightBackground = "#ffffff";

  const { state } = useLocation();

  const [isHome, setIsHome] = useState(false);
  const [isArchive, setIsArchive] = useState(false);
  const [isTrash, setIsTrash] = useState(false);
  const [isNewNote, setIsNewNote] = useState(false);
  const [isUpdateNote, setIsUpdateNote] = useState(false);
  const [bgColor, setBgColor] = useState(darkBackground);

  const [height, setHeight] = useState(0); // to find height of component except navbar
  const [toggleSidebar, setToggleSidebar] = useState(true);
  // const [noNote, setNoNote] = useState(true);

  const [isDark, setIsDark] = useState(true);
  // const [isLoading, setIsLoading] = useState(true);

  // const navigate = useNavigate();

  const handleToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  const changeView = useCallback(() => {
    console.log(url);
    if (url.includes("home")) {
      setIsHome(true);
      setIsArchive(false);
      setIsTrash(false);
      setIsNewNote(false);
      setIsUpdateNote(false);
    } else if (url.includes("archive")) {
      setIsHome(false);
      setIsArchive(true);
      setIsTrash(false);
      setIsNewNote(false);
      setIsUpdateNote(false);
    } else if (url.includes("trash")) {
      setIsHome(false);
      setIsArchive(false);
      setIsTrash(true);
      setIsNewNote(false);
      setIsUpdateNote(false);
    } else if (url.includes("newnote")) {
      setIsNewNote(true);
      setIsHome(false);
      setIsArchive(false);
      setIsTrash(false);
      setIsUpdateNote(false);
    } else if (url.includes("updatenote")) {
      setIsNewNote(false);
      setIsHome(false);
      setIsArchive(false);
      setIsTrash(false);
      setIsUpdateNote(true);
    }
  }, [url]);

  // const handleNoNote = () => {
  //   setNoNote(false);
  // };

  // isDark ? setBodyColor(darkBackground) : setBodyColor(lightBackground);

  useEffect(() => {
    isDark ? setBgColor(darkBackground) : setBgColor(lightBackground);
    document.body.style.backgroundColor = bgColor;
    console.log(bgColor);
    changeView();
  }, [changeView, isDark, bgColor]);

  useLayoutEffect(() => {
    setHeight(window.innerHeight - container.current.offsetHeight);
    console.log(container.current.clientHeight);
    console.log(height);
  }, [height]);

  return (
    <>
      <div
        className={
          "container-fluid " + isDark
            ? "bg-viridian-green"
            : "bg-viridian-green-light"
        }
      >
        <div className="row m-0 p-0" ref={container}>
          <NotesHomeNavbar
            handleToggle={handleToggle}
            isDark={isDark}
            setIsDark={setIsDark}
          />
        </div>
        <div className="row m-0 p-0" style={{ minHeight: height }}>
          {toggleSidebar && (
            <div
              className={
                "col-2 m-0 p-0 border-end border-1 " +
                (isDark ? "border-light" : "border-dark")
              }
            >
              <NotesHomeSidebar isDark={isDark} url={url} />
            </div>
          )}
          {(isHome || isArchive || isTrash) && (
            <>
              <div
                className={
                  "d-flex m-0 p-5 " +
                  (toggleSidebar ? "col-10 " : "col-12 ") +
                  (isDark ? "bg-viridian-green" : "bg-viridian-green-light")
                }
                id="note-content"
              >
                <NotesContent
                  isDark={isDark}
                  // handleNoNote={handleNoNote}
                  url={url}
                  bgColor={bgColor}
                />
              </div>
            </>
          )}
          {isNewNote && (
            <div
              className={
                "m-0 p-0 pb-5 " +
                (toggleSidebar ? "col-10 " : "col-12 ") +
                (isDark ? "bg-viridian-green" : "bg-viridian-green-light")
              }
            >
              <InsertNote isDark={isDark} url={url} />
            </div>
          )}

          {isUpdateNote && (
            <div
              className={
                "m-0 p-0 pb-5 " +
                (toggleSidebar ? "col-10 " : "col-12 ") +
                (isDark ? "bg-viridian-green" : "bg-viridian-green-light")
              }
            >
              <InsertNote
                isDark={isDark}
                title={state ? state.title : null}
                content={state ? state.content : null}
                _id={state ? state._id : null}
                url={url}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
