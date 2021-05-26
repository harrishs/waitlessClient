import React, {useEffect, useState, useContext} from "react";
import { AuthContext } from "../../context/authContext";

import WaitlistView from "./WaitlistView";

const WaitlistEditor = props => {
    const [name, setName] = useState("");
    const [time, setTime] = useState();
    const [waitlist, setWaitlist] = useState();
    const [increment, setIncrement] = useState();

    const [auth] = useContext(AuthContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/waitlist/${auth.userId}/waitlist`)
        .then(response => response.json())
        .then(data => setWaitlist(data.waitlist))
        .catch(err => console.log(err));
    }, [auth.userId, waitlist])

    const inputHandler = (e, type) => {
        if (type === "name"){
            setName(e.target.value);
        } else if (type === "time"){
            setTime(e.target.value);
        } else if (type === "increment"){
            setIncrement(e.target.value)
        }
    }

    const submitHandler = (event, type) => {
        event.preventDefault();
        let reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'X-Auth-Token': auth.token},
            body: JSON.stringify({name, time, increment})
        };

        let baseUrl = `${process.env.REACT_APP_API}/waitlist/`;

        if (type === "add"){
            baseUrl += `${auth.userId}/addWaitlist`;
        } else if (type === "update"){
            baseUrl += `${waitlist._id}/update`;
            reqOptions.method = "PUT"
        }

        fetch(baseUrl, reqOptions)
        .then(res => res.json())
        .then(data => setWaitlist(data.result))
        .catch(err => console.log(err));
    }

    let form = (
    <div>
        <h1>Add Waitlist</h1>
        <form onSubmit={(e) => submitHandler(e, "add")}>
            <label>Name</label>
            <input type="text" name="name" onChange={(e) => inputHandler(e,"name")}/>
            <label>Time</label>
            <input type="number" name="time"  step="1" onChange={(e) => inputHandler(e,"time")}/>
            <label>Increment</label>
            <input type="number" name="time"  step="1" onChange={(e) => inputHandler(e,"increment")}/>
            <button type="submit">Add Waitlist</button>
        </form>
    </div>
    )

    if (waitlist){
        form = (
        <div>
            <h1>Update Waitlist</h1>
            <form onSubmit={(e) => submitHandler(e, "update")}>
                <label>Name</label>
                <input type="text" name="name" onChange={(e) => inputHandler(e,"name")}/>
                <label>Time</label>
                <input type="number" name="time"  step="1" onChange={(e) => inputHandler(e,"time")}/>
                <label>Increment</label>
                <input type="number" name="time"  step="1" onChange={(e) => inputHandler(e,"increment")}/>
                <button type="submit">Update Waitlist</button>
            </form>
        </div>
        )
    }

    let renderWaitlist = <h1>No Waitlist</h1>

    if (waitlist){
        renderWaitlist = <WaitlistView waitlist={waitlist}/>
    }

    return (
        <div>
            {form}
            {renderWaitlist}
        </div>
    )
}

export default WaitlistEditor;