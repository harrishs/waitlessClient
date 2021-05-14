import React, {useContext, useState} from "react";
import {AuthContext} from "../../context/authContext";

const AddReservation = props => {
    const [name, setName] = useState("");
    const [size, setSize] = useState(1);
    const position = props.waitlist.length > 0 ? props.waitlist.length : 1;
    //Set expiry time by adding 30mins in milliseconds to current date
    const expire = Date.now() + (props.waitlist.time * 60 * 1000);

    const [auth] = useContext(AuthContext);

    const inputHandler = (e, type) => {
        if (type === "name"){
            setName(e.target.value);
        } else if (type === "size"){
            setSize(e.target.value);
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        let reqOptions = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'X-Auth-Token': auth.token},
            body: JSON.stringify({name, size, position, expire})
        };
        fetch(`${process.env.REACT_APP_API}/waitlist/book/${props.waitlist._id}`, reqOptions)
        .then(res => res.json())
        .then(final => console.log(final))
        .catch(err => console.log(err));
    }

    return (
        <div>
            <h1>Add Reservation</h1>
            <form onSubmit={(e) => submitHandler(e)}>
                <label>Name</label>
                <input type="text" name="name" onChange={(e) => inputHandler(e,"name")}/>
                <label>Party Size</label>
                <input type="number" step="1" name="size" onChange={(e) => inputHandler(e,"size")}/>
                <button type="submit">Add Reservation</button>
            </form>
        </div>
    )
}

export default AddReservation;