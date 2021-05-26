import React, {useEffect, useState, useContext} from "react";
import {AuthContext} from "../../context/authContext";

import AddReservation from "./AddReservation";
import ReservationCard from "./ReservationCard";

const WaitlistView = props => {
    const [reservations, setReservations] = useState();

    const [auth] = useContext(AuthContext);

    useEffect(() => {
        if (props.waitlist._id){
            fetch(`${process.env.REACT_APP_API}/waitlist/${props.waitlist._id}/reservations`)
            .then(response => response.json())
            .then(data => setReservations(data.reservations))
            .catch(err => console.log(err));
        }
    }, [reservations, props.waitlist._id])

    const deleteWaitlistHandler = () => {
        fetch(`${process.env.REACT_APP_API}/waitlist/delete/${props.waitlist._id}`, {
            method: "DELETE",
            headers: {'X-Auth-Token': auth.token}
        }).catch(err => console.log(err));
    }

    let renderReservations;
    if (!reservations){
        renderReservations = <h3>No Reservations</h3>
    } else {
        renderReservations = reservations.map(reservation => <ReservationCard key={reservation._id} reservation={reservation}/>)
    }
    
    return (
        <div>
            <h1>{props.waitlist.name}</h1>
            <h3>{props.waitlist.time}mins</h3>
            {renderReservations}
            <AddReservation waitlist={props.waitlist}/>
            <button onClick={deleteWaitlistHandler}>Delete Waitlist</button>
        </div>
    )
}

export default WaitlistView;