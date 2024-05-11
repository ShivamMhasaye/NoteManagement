import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Style/App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import NotesHome from "./Pages/NotesHome";
import UserProfile from "./Pages/UserProfile";
import PrivateRoutes from "./utils/PrivateRoutes";
import NavigateHome from "./utils/NavigateHome";
import ForgotPassword from "./Components/ForgotPassword";
import OtpInput from "./Components/OtpInput";
import ResetPassword from "./Components/ResetPassword";

function App() {
  // const url = window.location.pathname;
  // const navigate = useNavigate();
  // Redirect to home page if user is not logged in and trying to access any other page other than login
  // useEffect(() => {
  //   console.log(url);
  //   if(!sessionStorage.getItem('token') && url.includes("userid")){
  //     console.log(url);
  //     // history.replaceState('/');
  //     window.location.href='/';
  //   }
  // }, [url]);
  const [color, setColor] = useState("#283044");

  useEffect(() => {
    document.body.style.backgroundColor = color;
  }, [color]);

  return (
    <div style={{ backgroundColor: "#283044" }}>
      <BrowserRouter>
        <Routes>
          <Route element={<NavigateHome />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} caseSensitive />
            <Route path="/signup" element={<Signup />} caseSensitive />
            <Route
              path="/forgotpassword"
              element={<ForgotPassword />}
              caseSensitive
            />
            <Route path="/otp" element={<OtpInput />} caseSensitive />
            <Route
              path="/resetpassword"
              element={<ResetPassword />}
              caseSensitive
            />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route
              path="/userid/home"
              onClick={() => setColor("#000")}
              element={<NotesHome />}
              caseSensitive
            />
            <Route
              path="/userid/newnote"
              element={<NotesHome />}
              caseSensitive
            />
            <Route
              path="/userid/archive"
              element={<NotesHome />}
              caseSensitive
            />
            <Route path="/userid/trash" element={<NotesHome />} caseSensitive />
            <Route
              path="/userid/updatenote"
              element={<NotesHome />}
              caseSensitive
            />
            <Route
              path="/userid/profile"
              element={<UserProfile />}
              caseSensitive
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
