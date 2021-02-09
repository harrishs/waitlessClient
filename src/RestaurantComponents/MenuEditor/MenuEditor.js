import React, {useState, useEffect, useContext} from "react";
import {AuthContext} from "../../context/authContext";

import Aux from "../../hoc/Aux";
import AddMenu from "./addMenu";

const MenuEditor = props => {
    const [menus, setMenus] = useState([]);
    const [auth] = useContext(AuthContext);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API}/restaurant/${auth.userId}/menus`)
        .then(response => response.json())
        .then(data => {
            //receive array of menuIds from data.menus and retrieve all menu details
            data.menus.forEach(menuId => {
                fetch(`${process.env.REACT_APP_API}/restaurant/${menuId}`)
                .then(response => response.json())
                .then(data => setMenus(prevState => [...prevState, data.menu]))
                .catch(err => console.log(err));
            });
        })
        .catch(err => console.log(err));
    }, [auth.userId]);

    let renderMenus;

    if (menus){
        if (menus.length < 1){
            renderMenus = <h1>No Menus Available</h1>;
        } else {
            renderMenus = menus.map(menu => {
                return (
                    <div key={menu._id}>
                        <h1>{menu.name}</h1>
                        <p>{menu.description}</p>
                    </div>
                )
            });
        }
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