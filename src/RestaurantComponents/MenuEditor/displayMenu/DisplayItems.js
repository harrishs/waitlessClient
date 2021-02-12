import React, {useState, useEffect} from "react";

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

    //if props.display === true then display menu

    return (
        <div>

        </div>
    )
}

export default DisplayItems;