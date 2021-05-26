import React from "react";

const ReservationCard = props => {
    const deleteResHandler = () => {
        fetch(`${process.env.REACT_APP_API}/waitlist/delete/${props.reservation.waitlist}/reservation/${props.reservation._id}`, {
            method: "DELETE"
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <h1>{props.reservation.name}</h1>
            <h3>{props.reservation.size}</h3>
            <button onClick={deleteResHandler}>Delete Reservation</button>
        </div>
    )
}

export default ReservationCard;