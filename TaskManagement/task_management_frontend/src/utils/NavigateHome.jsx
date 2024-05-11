import { Navigate, Outlet } from "react-router-dom";

const NavigateHome = () => {
    const auth = localStorage.getItem("JWTToken");
    const username = localStorage.getItem("username");
    return auth && username ? <Navigate to="/userid/home" /> : <Outlet />;
};

export default NavigateHome;
