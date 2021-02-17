import React, {useState, useEffect} from "react";
import AddItem from "../addItem";

const DisplayItems = props => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        //receive array of menuIds from data.menus and retrieve all menu details
        let promises = [];
        console.log(props.menu.items);
        props.menu.items.forEach(itemId => {
            promises.push(
                fetch(`${process.env.REACT_APP_API}/restaurant/${itemId}`)
                .then(response => response.json())
                .then(data => data.item)
                .catch(err => console.log(err))
            );
        });
        Promise.all(promises)
        .then(data => setItems(data));
    }, [])

    return (
        <div>
            <AddItem id={props.menu._id}/>
        </div>
    )
}

export default DisplayItems;