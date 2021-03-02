import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import ItemCard from "../MenuEditor/displayMenu/ItemCard";

const Menu = () => {
    const params = useParams();
    const [menu, setMenu] = useState();
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/restaurant/menus/${params.menuId}`)
        .then(response => response.json())
        .then((data) => {
            //receive array of menuIds from data.menus and retrieve all menu details
            let promises = [];
            setMenu(data.menu);
            data.menu.items.forEach(itemId => {
                promises.push(
                    fetch(`${process.env.REACT_APP_API}/restaurant/items/${itemId}`)
                    .then(response => response.json())
                    .then(data => data.item)
                    .catch(err => console.log(err))
                );
            });
            Promise.all(promises)
            .then(data => setItems(data))
        })
        .catch(err => console.log(err));
    },[params.menuId])

    let renderItems = <h1>No Items</h1>
    let details = <h1>Details Unavailable</h1>

    if (menu && menu.name && menu.description){
        details = (
            <>
            <h1>{menu.name}</h1>
            <p>{menu.description}</p>
            </>
        )
    }

    if (items && items.length >= 1){
        renderItems = items.map(item => {
            if (item && item._id){
                return <ItemCard key={item._id} item={item} client/>
            }
            else {
                return null
            }
        })
    }

    return (
        <div>
            {details}
            {renderItems}
        </div>
    )
}

export default Menu;