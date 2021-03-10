import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext";
import classes from "./addForm.module.css";

const AddMenu = props => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [auth] = useContext(AuthContext);

    const inputHandler = (e, type) => {
        if (type === "name"){
            setName(e.target.value);
        } else if (type === "description"){
            setDescription(e.target.value);
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        let reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'X-Auth-Token': auth.token},
            body: JSON.stringify({name, description})
        };
        fetch(`${process.env.REACT_APP_API}/restaurant/${auth.userId}/addMenu`, reqOptions)
        .then(res => res.json())
        .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Add Menu</h1>
            <form onSubmit={(e) => submitHandler(e)} className={classes.Form}>
                <label>Name</label>
                <input type="text" name="name" onChange={(e) => inputHandler(e,"name")}/>
                <label>Description</label>
                <input type="text" name="description" onChange={(e) => inputHandler(e,"description")}/>
                <button type="submit">Add Menu</button>
            </form>
        </div>
    )
}

export default AddMenu;