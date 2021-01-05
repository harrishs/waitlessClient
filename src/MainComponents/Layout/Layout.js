import React, {useState} from "react";

import Aux from "../../hoc/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideBar from "../Navigation/SideBar/SideBar"

const Layout = ( props ) => {
    const [showSideBar, setShowSideBar] = useState(false);

    const sideBarCloseHandler = () => {
        setShowSideBar(false);
    }

    const sideBarToggleHandler = () => {
        setShowSideBar(!showSideBar);
    }

    return (
        <Aux>
            <Toolbar barToggle={sideBarToggleHandler}/>
            <SideBar closed={sideBarCloseHandler} open={showSideBar}/>
            <div> Backdrop</div>
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

export default Layout;