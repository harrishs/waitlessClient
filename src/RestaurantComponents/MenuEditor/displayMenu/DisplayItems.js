import React, {useState, useEffect} from "react";
import AddItem from "../addItem";

const DisplayItems = props => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        //receive array of menuIds from data.menus and retrieve all menu details
        let promises = [];
        props.menu.items.forEach(itemId => {
            promises.push(
                fetch(`${process.env.REACT_APP_API}/restaurant/items/${itemId}`)
                .then(response => response.json())
                .then(data => data.item)
                .catch(err => console.log(err))
            );
        });
        Promise.all(promises)
        .then(data => setItems(data));
    }, [])

    let renderItems = <h1>No Items in Menu</h1>

    if (items && items.length > 0){
        renderItems = items.map(item => {
            if (item && item.inStock){
                return (
                    <div key={item._id}>
                        <h1>{item.name}</h1>
                        <h3>{item.description}</h3>
                        <h3>{item.price}</h3>
                    </div>
                )
            } else {
                return null;
            }
        })
    }

    return (
        <div>
            {renderItems}
            <AddItem id={props.menu._id}/>
        </div>
    )
}

export default DisplayItems;