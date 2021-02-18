import React, {useContext, useState} from "react";
import {AuthContext} from "../../../context/authContext";

import classes from "./DisplayMenu.module.css";
import DisplayItems from "./DisplayItems";

const DisplayMenu = props => {
    const [auth] = useContext(AuthContext);
    const [toggledMenu, setToggledMenu] = useState(false);

    const deleteMenuHandler = () => {
        fetch(`${process.env.REACT_APP_API}/restaurant/${props.menu._id}/delete`, {
            method: "DELETE",
            headers: {'X-Auth-Token': auth.token}
        }).catch(err => console.log(err));
    }

    const toggleHandler = () => {
        setToggledMenu(prevState => !prevState);
    }

    let toggleButton = <button onClick={toggleHandler}>Display Menu</button>

    if (toggledMenu){
        toggleButton = <button onClick={toggleHandler}>Hide Menu</button>
    }

    let renderMenu;
    if (toggledMenu) {
        renderMenu = <DisplayItems menu={props.menu}/>
    }
    return (
        <div className={classes.Menu}>
            <h1>{props.menu.name}</h1>
            <p>{props.menu.description}</p>
            {toggleButton}
            <button onClick={deleteMenuHandler}>Delete</button>
            {renderMenu}
        </div>
    )
}

export default DisplayMenu;