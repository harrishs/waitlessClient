import React, {useState, useEffect, useContext} from "react";
import {AuthContext} from "../../context/authContext";

import Aux from "../../hoc/Aux";
import AddMenu from "./addMenu";

const MenuEditor = props => {

    const [menus, setMenus] = useState();
    const [auth] = useContext(AuthContext);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API}/${auth.userId}/menus`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setMenus(data.items);
        })
        .catch(err => console.log(err));
    }, []);

    let displayMenus = <div>
        <h1>No Items On Menu</h1>
        <AddMenu />
    </div>

    if (menus){
        let menuRender;
        if (menus.length > 0){
            menuRender = menus.map(item => {
                console.log(item);
                return (
                    <div key={item._id}>
                        <h1>{item.name}</h1>
                        <h3>{item.price}</h3>
                    </div>
                )
            });
        }
        displayMenus = <div>
            <h1>Items On Menu</h1>
            {menuRender}
            <AddMenu />
        </div>
    }

    return (
        <Aux>
            {displayMenus}
        </Aux>
    )
}

export default MenuEditor;