import React, {useState} from "react";

const AddItem = props => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0.00);
    const [imageUrl, setImageUrl] = useState("");

    const inputHandler = (e, type) => {
        if (type === "name"){
            setName(e.target.value);
        } else if (type === "description"){
            setDescription(e.target.value);
        } else if (type === "price"){
            setPrice(e.target.value);
        } else if (type === "imageUrl"){
            setImageUrl(e.target.value);
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        let reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, description, price, imageUrl})
        };
        fetch(`${process.env.REACT_APP_API}/restaurant/menu/add`, reqOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Add Items to Menu</h1>
            <form onSubmit={(e) => submitHandler(e)}>
                <label>Name</label>
                <input type="text" name="name" onChange={(e) => inputHandler(e,"name")}/>
                <label>Description</label>
                <input type="text" name="description" onChange={(e) => inputHandler(e,"description")}/>
                <label>Price</label>
                <input type="number" step="0.01" name="price" min="0.00" onChange={(e) => inputHandler(e,"price")}/>
                <label>Image Url</label>
                <input type="text" name="imageUrl" onChange={(e) => inputHandler(e,"imageUrl")}/>
                <button type="submit">Add Item</button>
            </form>
        </div>
    )
}

export default AddItem;