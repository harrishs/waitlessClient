import React from "react";

import NavItems from "../NavItems/NavItems";
import classes from "./SideBar.module.css";

const SideBar = props => {
    return (
        <div className={classes.SideBar}>
            <div>Logo</div>
            <nav>
                <NavItems />
            </nav>
        </div>
    )
}

export default SideBar;