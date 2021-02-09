import React, {useState, useEffect, useContext} from "react";
import {AuthContext} from "../../context/authContext";

import Aux from "../../hoc/Aux";
import AddMenu from "./addMenu";

const MenuEditor = props => {

    const [menus, setMenus] = useState();
    const [auth] = useContext(AuthContext);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API}/restaurant/${auth.userId}/menus`)
        .then(response => response.json())
        .then(data => {
            //recieve array of menuIds from data.menus and retrieve all menu details
            let finalMenus = [];
            data.menus.forEach(menuId => {
                fetch(`${process.env.REACT_APP_API}/restaurant/${menuId}`)
                .then(response => response.json())
                .then(data => finalMenus.push(data.menu))
                .catch(err => console.log(err));
            });
            setMenus(finalMenus);
        })
        .catch(err => console.log(err));
    });

    let renderMenus = <h1>No Menus Available</h1>;

    if (menus){
        renderMenus = menus.map(menu => {
            return(
                <div key={menu._id}>
                    <h1>{menu.name}</h1>
                    <p>{menu.description}</p>
                </div>
            )
        })
    }

    let displayMenus = <div>
        {renderMenus}
        <AddMenu />
    </div>

    return (
        <Aux>
            {displayMenus}
        </Aux>
    )
}

export default MenuEditor;