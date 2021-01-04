import React from  "react";

import NavItem from "./NavItem/NavItem";
import classes from "./NavItems.module.css";

const NavItems = () => (
    <ul className={classes.NavItems}>
        <NavItem link="/" active>Authentication</NavItem>
       <NavItem link="/">Menu Editor</NavItem>
    </ul>
)

export default NavItems;