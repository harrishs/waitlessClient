import React from "react";

import classes from "./Toolbar.module.css";
import NavItems from "../NavItems/NavItems";

const Toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <div>Menu</div>
            <div>Logo</div>
            <nav>
                <NavItems />
            </nav>
        </header>
    )
}

export default Toolbar;