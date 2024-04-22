// import { Link } from "react-router-dom";
import React from "react";
import { FaBars } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { IoIosSunny, IoIosMoon } from "react-icons/io";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import toggleTheme from "../App/reducers/themeSlice";
import logo from "../images/navLogo.jpg";
import logoLight from "../images/lightLogo.jpg";
import "../Style/NotesHome.css";

export default function NotesHomeNavbar(props) {
  const navigate = useNavigate();

  const username = localStorage.getItem("username");
  // const isDark = useSelector((state) => state.theme);
  // const [toggle, setToggle] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("JWTToken");
    localStorage.removeItem("username");
    // dispatch(logout());
    navigate("/", { replace: true });
  };

  const iconStyles = {
    color: "#EEE5E9",
    fontSize: "1.75rem",
  };

  const iconStylesLight = {
    color: "#111A16",
    fontSize: "1.75rem",
  };

  const changeDarkMode = () => {
    // dispatch(toggleTheme(isDark));
    props.setIsDark(!props.isDark);
  };

  // useEffect(() => {
  //   dispatch(toggleTheme(props.isDark));
  // }, [props.isDark]);

  return (
    <>
      <Navbar
        bg={props.isDark ? "dark" : "light"}
        className={
          "border-bottom border-1 " +
          (props.isDark ? "border-light" : "border-dark")
        }
      >
        <div className="container-fluid">
          <Nav.Item>
            <FaBars
              style={props.isDark ? iconStyles : iconStylesLight}
              className="ms-5 ps-2 me-5"
              role="button"
              onClick={props.handleToggle}
            />
          </Nav.Item>
          <Nav.Item>
            <Navbar.Brand>
              <img
                src={props.isDark ? logo : logoLight}
                height="30%"
                width="20%"
                alt=""
                className="ms-0"
              />
            </Navbar.Brand>
          </Nav.Item>
          <Nav.Item
            className="fs-3 me-2"
            onClick={changeDarkMode}
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title={"Switch To " + (props.isDark ? "Light Mode" : "Dark Mode")}
          >
            {props.isDark ? (
              <IoIosMoon className="text-light" />
            ) : (
              <IoIosSunny className="text-dark" />
            )}
          </Nav.Item>
          <Nav.Item>
            <NavDropdown
              title={<FaUserCircle />}
              className={"fs-3 " + (props.isDark ? "text-warning" : "")}
              style={props.isDark ? {} : { color: "#003ef8" }}
            >
              <NavDropdown.Item className="text-light disabled">
                Hi, {username}
              </NavDropdown.Item>
              <NavDropdown.Item href="/user/profile" className="text-light">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item className="text-light" onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </NavDropdown>
          </Nav.Item>
        </div>
      </Navbar>
    </>
  );
}
