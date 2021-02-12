import React, {useContext, useState} from "react";
import {AuthContext} from "../../../context/authContext";

import classes from "./DisplayMenu.module.css";
import DisplayItems from "./DisplayItems";

const DisplayMenu = props => {
    const [auth] = useContext(AuthContext);
    const [toggledMenu, setToggledMenu] = useState();

    const deleteMenuHandler = (menuId) => {
        fetch(`${process.env.REACT_APP_API}/restaurant/${menuId}/delete`, {
            method: "DELETE",
            headers: {'X-Auth-Token': auth.token}
        }).catch(err => console.log(err));
    }

    return (
        <div className={classes.Menu}>
            <h1>{props.menu.name}</h1>
            <p>{props.menu.description}</p>
            <button onClick={() => deleteMenuHandler(props.menu._id)}>Delete</button>
            <button>Display Menu</button>
            <DisplayItems menu={props.menu} display={toggledMenu === props.menu._id ? true : false}/>
        </div>
    )
}

export default DisplayMenu;