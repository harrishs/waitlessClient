import React from "react";

import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideBar from "../Navigation/SideBar/SideBar"

const Layout = ( props ) => (
    <Aux>
        <Toolbar />
        <SideBar />
        <div> Backdrop</div>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
)

export default Layout;