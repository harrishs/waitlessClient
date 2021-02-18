import React, {useState, useEffect, useContext} from "react";
import {AuthContext} from "../../context/authContext";

import Aux from "../../hoc/Aux";
import AddMenu from "./addMenu";
import classes from "./MenuEditor.module.css";
import DisplayMenu from "./displayMenu/DisplayMenu";

const MenuEditor = () => {
    const [menus, setMenus] = useState([]);
    const [auth] = useContext(AuthContext);

    useEffect(()=> {
        fetch(`${process.env.REACT_APP_API}/restaurant/${auth.userId}/menus`)
        .then(response => response.json())
        .then(async(data) => {
            //receive array of menuIds from data.menus and retrieve all menu details
            let promises = [];
            data.menus.forEach(menuId => {
                promises.push(
                    fetch(`${process.env.REACT_APP_API}/restaurant/menus/${menuId}`)
                    .then(response => response.json())
                    .then(data => data.menu)
                    .catch(err => console.log(err))
                );
            });
            Promise.all(promises)
            .then(data => setMenus(data))
        })
        .catch(err => console.log(err));
    }, [auth.userId, menus]);

    let renderMenus;

    if (menus){
        if (menus.length <= 0){
            renderMenus = <h1>No Menus Available</h1>;
        } else if (menus.length > 0 ){
            renderMenus = menus.map(menu => {
                if (menu && menu._id){
                    return <DisplayMenu key={menu._id} menu={menu} /> 
                } else {
                    return null
                }
            });
        }
    }

    let addMenu;
    if (menus.length < 5){
        addMenu = <AddMenu />;
    }

    let displayMenus = <div className={classes.MenuEditor}>
        {renderMenus}
        {addMenu}
    </div>

    return (
        <Aux>
            {displayMenus}
        </Aux>
    )
}

export default MenuEditor;