import React, {useState, useContext} from "react";
import {AuthContext} from "../../context/authContext";
import classes from "./addForm.module.css";

const AddItem = props => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0.00);
    const [imageUrl, setImageUrl] = useState("");
    const [section, setSection] = useState("");
    const [auth] = useContext(AuthContext);

    const inputHandler = (e, type) => {
        if (type === "name"){
            setName(e.target.value);
        } else if (type === "description"){
            setDescription(e.target.value);
        } else if (type === "price"){
            setPrice(e.target.value);
        } else if (type === "imageUrl"){
            setImageUrl(e.target.value);
        } else if (type === "section"){
            setSection(e.target.value);
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        let reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'X-Auth-Token': auth.token },
            body: JSON.stringify({name, description, price, imageUrl, section})
        };
        fetch(`${process.env.REACT_APP_API}/restaurant/menus/${props.id}/addItem`, reqOptions)
        .then(res => res.json())
        .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Add Items to Menu</h1>
            <form onSubmit={(e) => submitHandler(e)} className={classes.Form}>
                <label>Name</label>
                <input type="text" name="name" required onChange={(e) => inputHandler(e,"name")}/>
                <label>Description</label>
                <input type="text" name="description" required onChange={(e) => inputHandler(e,"description")}/>
                <label>Price</label>
                <input type="number" step="0.01" required name="price" min="0.00" onChange={(e) => inputHandler(e,"price")}/>
                <label>Image Url</label>
                <input type="text" name="imageUrl" onChange={(e) => inputHandler(e,"imageUrl")}/>
                <label>Section</label>
                <input type="text" name="section" required onChange={(e) => inputHandler(e,"section")}/>
                <button type="submit">Add Item</button>
            </form>
        </div>
    )
}

export default AddItem;