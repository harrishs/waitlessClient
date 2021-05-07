import React, {useEffect, useState} from "react";

const WaitlistView = props => {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_API}/waitlist/${props.waitlist._id}/reservations`)
        .then(response => response.json())
        .then(data => setReservations(data.reservations))
        .catch(err => console.log(err));
    })

    let renderReservations;
    if (reservations.length < 1){
        renderReservations = <h3>No Reservations</h3>
    }
    
    return (
        <div>
            <h1>{props.waitlist.name}</h1>
            <h3>{props.waitlist.time}mins</h3>
            {renderReservations}
        </div>
    )
}

export default WaitlistView;