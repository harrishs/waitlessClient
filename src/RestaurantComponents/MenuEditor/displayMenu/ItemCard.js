import React, {useContext, useState} from "react";
import classes from "./ItemCard.module.css";
import {AuthContext} from "../../../context/authContext";

const ItemCard = props => {
    const [auth] = useContext(AuthContext)
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(props.item.name);
    const [description, setDescription] = useState(props.item.description);
    const [price, setPrice] = useState(props.item.price);
    const [imageUrl, setImageUrl] = useState(props.item.imageUrl);
    const [section, setSection] = useState(props.item.section);

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

    const deleteItemHandler = () => {
        fetch(`${process.env.REACT_APP_API}/restaurant/items/${props.item.menu}/${props.item._id}/delete`, {
            method: "DELETE",
            headers: {'X-Auth-Token': auth.token}
        }).catch(err => console.log(err));
    }

    const editItemHandler = (event) => {
        event.preventDefault();
        let reqOptions = {
            method: "PUT",
            headers: { 'Content-Type': 'application/json', 'X-Auth-Token': auth.token },
            body: JSON.stringify({name, description, price, imageUrl, section})
        };
        fetch(`${process.env.REACT_APP_API}/restaurant/items/${props.item.menu}/${props.item._id}/edit`, reqOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setEditMode(false);
        }).catch(err => console.log(err));
    }

    let displayCard = (
        <div className={classes.Card}>
        <h1>{props.item.name}</h1>
        <h3>{props.item.description}</h3>
        <h3>{props.item.price}</h3>
        <button onClick={() => setEditMode(prevState => !prevState)}>Edit</button>
        <button onClick={deleteItemHandler}>Delete</button>
    </div>
    )

    if (editMode) {
        displayCard = (
            <form onSubmit={(e) => editItemHandler(e)}>
            <label>Name</label>
            <input type="text" name="name" required defaultValue={props.item.name} onChange={(e) => inputHandler(e,"name")}/>
            <label>Description</label>
            <input type="text" name="description" required defaultValue={props.item.description} onChange={(e) => inputHandler(e,"description")}/>
            <label>Price</label>
            <input type="number" step="0.01" required name="price" min="0.00" defaultValue={props.item.price} onChange={(e) => inputHandler(e,"price")}/>
            <label>Image Url</label>
            <input type="text" name="imageUrl" defaultValue={props.item.imageUrl} onChange={(e) => inputHandler(e,"imageUrl")}/>
            <label>Section</label>
            <input type="text" name="section" required defaultValue={props.item.section} onChange={(e) => inputHandler(e,"section")}/>
            <button type="submit">Update Item</button>
        </form>
        )
    }

    return (
        <>
        {displayCard}
        </>
    )
}

export default ItemCard;