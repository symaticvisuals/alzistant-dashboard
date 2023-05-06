import Cookies from "js-cookie";
import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const useAuth = () => {
    const token = Cookies.get("token");
    const profile = Cookies.get("profile");

    if (token && profile) {
        return true;
    } else {
        return false;
    }
};

const ProtectedRoutes = () => {
    const auth = useAuth();
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
