import React, {useState, useContext} from "react";
import {AuthContext} from "../../context/authContext";
import classes from "./Auth.module.css";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [address, setAddress] = useState("");
    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [, setAuth] = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();
        let reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, email, password, address, latitude, longitude})
        };
        fetch(`${process.env.REACT_APP_API}/auth/register`, reqOptions)
        .then(res => res.json())
        .then(data => {
            if (data.userId && data.token){
                const newAuth = {
                    userId: data.userId,
                    token: data.token,
                    isAuth: true
                };
                setAuth(newAuth);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("token", data.token);
            }
        }).catch(err => console.log(err));
    }

    const entryHandler = (e, type) => {
        let entry = e.target.value;
        if (type === "name"){
            setName(entry);
        } else if (type === "email"){
            setEmail(entry);
        } else if (type === "password"){
            setPassword(entry);
        } else if (type === "address"){
            setAddress(entry);
        } else if (type === "latitude"){
            setLatitude(entry);
        } else if (type === "longitude"){
            setLongitude(entry);
        } 
    }

    return (
        <div className={classes.Auth}>
            <form onSubmit={e => submitHandler(e)}>
                <label>Name</label>
                <input type="text" onChange={e => entryHandler(e, "name")}/>
                <label>Email</label>
                <input type="email" onChange={e => entryHandler(e, "email")} autoComplete="username"/>
                <label>Password</label>
                <input type="password" onChange={e => entryHandler(e, "password")} autoComplete="current-password"/>
                <label>Address</label>
                <input type="text" onChange={e => entryHandler(e, "address")}/>
                <label>Latitude</label>
                <input type="text" onChange={e => entryHandler(e, "latitude")}/>
                <label>Longitude</label>
                <input type="text" onChange={e => entryHandler(e, "longitude")}/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;