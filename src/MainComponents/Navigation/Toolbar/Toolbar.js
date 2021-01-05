import React from "react";

import classes from "./Toolbar.module.css";
import NavItems from "../NavItems/NavItems";
import BarToggle from "../SideBar/BarToggle";

const Toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <BarToggle clicked={props.barToggle}/>
            <div>Logo</div>
            <nav className={classes.DesktopOnly}>
                <NavItems />
            </nav>
        </header>
    )
}

export default Toolbar;