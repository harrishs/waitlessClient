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
            setMenu(data);
        })
        .catch(err => console.log(err));
    }, []);

    let displayMenu = <div>
        <h1>No Items On Menu</h1>
        <AddMenu />
    </div>

    if (menu){
        if (menu.length >= 1) {
            displayMenu = <div>
                <h1>Items On Menu</h1>
            </div>
        }
    }

    return (
        <Aux>
            {displayMenu}
        </Aux>
    )
}

export default MenuEditor;