import React, {useEffect, useState, useContext} from "react";
import { AuthContext } from "../../context/authContext";

const WaitlistEditor = props => {
    const [name, setName] = useState("");
    const [time, setTime] = useState();
    const [waitlist, setWaitlist] = useState();

    const [auth] = useContext(AuthContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/waitlist/${auth.userId}/waitlist`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }, [auth.userId])

    const inputHandler = (e, type) => {
        if (type === "name"){
            setName(e.target.value);
        } else if (type === "time"){
            setTime(e.target.value);
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        let reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'X-Auth-Token': auth.token},
            body: JSON.stringify({name, time})
        };
        fetch(`${process.env.REACT_APP_API}/waitlist/${auth.userId}/addWaitlist`, reqOptions)
        .then(res => res.json())
        .catch(err => console.log(err));
    }

    const form = (
    <div>
        <h1>Add Waitlist</h1>
        <form onSubmit={(e) => submitHandler(e)}>
            <label>Name</label>
            <input type="text" name="name" onChange={(e) => inputHandler(e,"name")}/>
            <label>Time</label>
            <input type="number" name="description"  step="0.1" onChange={(e) => inputHandler(e,"time")}/>
            <button type="submit">Add Menu</button>
        </form>
    </div>
    )

    return (
        <div>
            {form}
        </div>
    )
}

export default WaitlistEditor;