import React from "react";

import classes from "./BarToggle.module.css";

const BarToggle = props => {
    return (
        <div onClick={props.clicked} className={classes.BarToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default BarToggle;