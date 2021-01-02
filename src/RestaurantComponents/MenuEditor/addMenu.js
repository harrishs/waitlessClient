import React, {useState} from "react";

const Menu = props => {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0.00);
    const [imageUrl, setImageUrl] = useState("");

    return (
        <div>
            <h1>Add Items to Menu</h1>
            <form>
                <label>Name</label>
                <input type="text" name="name"/>
                <label>Description</label>
                <input type="text" name="description"/>
                <label>Price</label>
                <input type="number" step="0.01" name="price" min="0.00"/>
                <label>Image Url</label>
                <input type="text" name="imageUrl"/>
            </form>
        </div>
    )
}

export default Menu;