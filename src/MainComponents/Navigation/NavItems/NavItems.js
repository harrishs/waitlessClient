import React, { useContext } from  "react";

import NavItem from "./NavItem/NavItem";
import classes from "./NavItems.module.css";
import {AuthContext} from "../../../context/authContext";

const NavItems = () => {
    const [auth] = useContext(AuthContext);

    let items = (
        <>
            <NavItem link="/login" active>Login</NavItem>
            <NavItem link="/register">Register</NavItem>
        </>
    )

    if (auth.isAuth){
        items = (
            <>
                <NavItem link="/" active>Menu Editor</NavItem>
                <NavItem link="/logout">Logout</NavItem>
            </>
        )
    }

    return (
        <ul className={classes.NavItems}>
            {items}
        </ul>
    )
}

export default NavItems;