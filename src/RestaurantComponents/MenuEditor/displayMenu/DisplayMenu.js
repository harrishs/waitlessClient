import React, {useContext} from "react";
import {AuthContext} from "../../../context/authContext";

const DisplayMenu = props => {
    const [auth] = useContext(AuthContext);

    const deleteMenuHandler = (menuId) => {
        fetch(`${process.env.REACT_APP_API}/restaurant/${menuId}/delete`, {
            method: "DELETE",
            headers: {'X-Auth-Token': auth.token}
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <h1>{props.menu.title}</h1>
            <p>{props.menu.description}</p>
            <button onClick={() => deleteMenuHandler(props.menu._id)}>Delete</button>
        </div>
    )
}

export default DisplayMenu;