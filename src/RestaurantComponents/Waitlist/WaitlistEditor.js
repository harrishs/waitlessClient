import { render } from "@testing-library/react";
import React, {useEffect, useState, useContext} from "react";
import { AuthContext } from "../../context/authContext";

import WaitlistView from "./WaitlistView";

const WaitlistEditor = props => {
    const [name, setName] = useState("");
    const [time, setTime] = useState();
    const [waitlist, setWaitlist] = useState();

    const [auth] = useContext(AuthContext);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/waitlist/${auth.userId}/waitlist`)
        .then(response => response.json())
        .then(data => setWaitlist(data.waitlist))
        .catch(err => console.log(err));
    }, [auth.userId])

    const inputHandler = (e, type) => {
        if (type === "name"){
            setName(e.target.value);
        } else if (type === "time"){
            setTime(e.target.value);
        }
    }

    const submitHandler = (event, type) => {
        event.preventDefault();
        let reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'X-Auth-Token': auth.token},
            body: JSON.stringify({name, time})
        };

        if (type === "add"){
            fetch(`${process.env.REACT_APP_API}/waitlist/${auth.userId}/addWaitlist`, reqOptions)
            .then(res => res.json())
            .then(waitlist => setWaitlist(waitlist))
            .catch(err => console.log(err));
        } else if (type === "update"){
            fetch(`${process.env.REACT_APP_API}/waitlist/${waitlist.id}/update`, reqOptions)
            .then(res => res.json())
            .then(waitlist => setWaitlist(waitlist))
            .catch(err => console.log(err));
        }
    }

    let form = (
    <div>
        <h1>Add Waitlist</h1>
        <form onSubmit={(e) => submitHandler(e, "add")}>
            <label>Name</label>
            <input type="text" name="name" onChange={(e) => inputHandler(e,"name")}/>
            <label>Time</label>
            <input type="number" name="description"  step="0.1" onChange={(e) => inputHandler(e,"time")}/>
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
                <input type="number" name="description"  step="0.1" onChange={(e) => inputHandler(e,"time")}/>
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