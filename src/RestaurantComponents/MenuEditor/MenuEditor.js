import React, {useState, useEffect} from "react";

import Aux from "../../hoc/Aux";
import {apiUrl} from "../../util/constants";
import AddMenu from "./addMenu";

const MenuEditor = props => {

    const [menu, setMenu] = useState();

    useEffect(()=> {
        fetch(`${apiUrl}/restaurant/menu`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setMenu(data.items);
        })
        .catch(err => console.log(err));
    }, []);

    let displayMenu = <div>
        <h1>No Items On Menu</h1>
        <AddMenu />
    </div>

    if (menu){
        let menuRender;
        if (menu.length > 0){
            menuRender = menu.map(item => {
                console.log(item);
                return (
                    <div key={item._id}>
                        <h1>{item.name}</h1>
                        <h3>{item.price}</h3>
                    </div>
                )
            });
        }
        displayMenu = <div>
            <h1>Items On Menu</h1>
            {menuRender}
            <AddMenu />
        </div>
    }

    return (
        <Aux>
            {displayMenu}
        </Aux>
    )
}

export default MenuEditor;