import React from 'react';

const Guest = props => {
    const { guest } = props;

    return (
        <div>
            <p>{guest.comment}</p>
            <h1>{guest.fName}{guest.lName}</h1>
        </div>
    )
}

export default Guest;