import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const [, setAuth] = useContext(AuthContext);

    const submitHandler = (event) => {
        event.preventDefault();
        let reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, password})
        };
        fetch(`${process.env.REACT_APP_API}/auth/login`, reqOptions)
        .then(res => res.json())
        .then(data => {
            if (data.userId && data.token) {
                const newAuth = {
                    userId: data.userId,
                    token: data.token,
                    isAuth: true
                };
                setAuth(newAuth);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("token", data.token);
            }
            console.log(data);
        }).catch(err => console.log(err));
    }

    const entryHandler = (e, type) => {
        let entry = e.target.value;
        if (type === "email"){
            setEmail(entry);
        } else if (type === "password"){
            setPassword(entry);
        }
    }

    return (
        <div>
            <form onSubmit={e => submitHandler(e)}>
                <label>Email</label>
                <input type="email" onChange={e => entryHandler(e, "email")} autoComplete="username"/>
                <label>Password</label>
                <input type="password" onChange={e => entryHandler(e, "password")} autoComplete="current-password"/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login;