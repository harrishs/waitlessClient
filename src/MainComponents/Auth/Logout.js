import React, { useContext, useEffect } from "react";
import {AuthContext} from "../../context/authContext";
import {Redirect} from "react-router-dom";

const Logout = () => {
    const [, setAuth] = useContext(AuthContext);
    
    useEffect(() => {
        const logout = () => {
            const newAuth = {
              userId: null,
              token: null,
              isAuth: false
            };
            setAuth(newAuth);
            localStorage.removeItem("userId");
            localStorage.removeItem("token");
        }
        logout();
    });

    return (
        <>
        <Redirect to="/"/>
        </>
    )
}

export default Logout;