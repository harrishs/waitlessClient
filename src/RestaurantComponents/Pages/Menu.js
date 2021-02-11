import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const Menu = () => {
    const params = useParams();
    const [items, setItems] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/restaurant/${params.menuId}`)
        .then(response => response.json())
        .then(async(data) => {
            //receive array of menuIds from data.menus and retrieve all menu details
            let promises = [];
            console.log(data.menu.items);
            data.menu.items.forEach(itemId => {
                promises.push(
                    fetch(`${process.env.REACT_APP_API}/restaurant/${itemId}`)
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

    return (
        <div>
            
        </div>
    )
}

export default Menu;