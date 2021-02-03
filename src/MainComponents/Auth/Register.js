import React, {useState} from "react";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const submitHandler = (event) => {
        event.preventDefault();
        let reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({name, email, password})
        };
        fetch(`${process.env.REACT_APP_API}/auth/register`, reqOptions)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <form onSubmit={e => submitHandler(e)}>
                <label>Name</label>
                <input type="text"/>
                <label>Email</label>
                <input type="email"/>
                <label>Password</label>
                <input type="password"/>
                <button type="submit">Register</button>
            </form>
        </div>
    )
}

export default Register;