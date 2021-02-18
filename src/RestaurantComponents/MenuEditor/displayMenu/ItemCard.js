import React, {useContext} from "react";
import classes from "./ItemCard.module.css";
import {AuthContext} from "../../../context/authContext";

const ItemCard = props => {
    const [auth] = useContext(AuthContext)

    const deleteItemHandler = () => {
        fetch(`${process.env.REACT_APP_API}/restaurant/${props.item.menu}/${props.item._id}/delete`, {
            method: "DELETE",
            headers: {'X-Auth-Token': auth.token}
        }).catch(err => console.log(err));
    }

    return (
    <div className={classes.Card}>
        <h1>{props.item.name}</h1>
        <h3>{props.item.description}</h3>
        <h3>{props.item.price}</h3>
        <button>Edit</button>
        <button onClick={deleteItemHandler}>Delete</button>
    </div>
    )
}

export default ItemCard;