import React from "react";

import NavItems from "../NavItems/NavItems";
import classes from "./SideBar.module.css";
import Backdrop from "../../Backdrop/Backdrop";
import Aux from "../../../hoc/Aux";

const SideBar = props => {
    let sideClasses = [classes.SideBar, classes.Close];

    if (props.open) {
        sideClasses = [classes.SideBar, classes.Open];
    }

    return (
        <Aux>
            <Backdrop clicked={props.closed} show={props.open}/>
            <div className={sideClasses.join(" ")}>
                <div style={{marginBottom: "15px"}}>Logo</div>
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Aux>
    )
}

export default SideBar;