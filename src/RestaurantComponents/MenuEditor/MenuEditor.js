import React, {useState, useEffect, useContext} from "react";
import {AuthContext} from "../../context/authContext";
import {Link} from "react-router-dom";

import Aux from "../../hoc/Aux";
import AddMenu from "./addMenu";
import classes from "./MenuEditor.module.css";

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
                    fetch(`${process.env.REACT_APP_API}/restaurant/${menuId}`)
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

    const deleteMenuHandler = (menuId) => {
        fetch(`${process.env.REACT_APP_API}/restaurant/${menuId}/delete`, {
            method: "DELETE",
            headers: {'X-Auth-Token': auth.token}
        }).catch(err => console.log(err));
    }

    let renderMenus;

    if (menus){
        if (menus.length < 1){
            renderMenus = <h1>No Menus Available</h1>;
        } else {
            renderMenus = menus.map(menu => {
                return (
                    <Link key={menu._id} to={`/manage/${menu._id}`} className={classes.Menu}>
                        <h1>{menu.name}</h1>
                        <p>{menu.description}</p>
                        <button className={classes.Delete} onClick={() => deleteMenuHandler(menu._id)}>Delete</button>
                    </Link>
                )
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