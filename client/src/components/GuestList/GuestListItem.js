import React from 'react';
import { useHistory } from 'react-router-dom';
import slugify from 'slugify';
import './styles.css';

const GuestListItem = props => {
    const { guest, clickGuest, deleteGuest, editGuest } = props;
    const history = useHistory();

    const handleClickGuest = guest => {
        const slug = slugify(guest.fName, { lower: true });

        clickGuest(guest);
        history.push(`/guests/${slug}`);
    };

    const handleEditGuest = guest => {
        editGuest(guest);
        history.push(`/edit-guest/${guest.id}`);
    };

    return (
        <div>
            <div className="guestListItem" onClick={() => handleClickGuest(guest)}>
                <p>"{guest.comment}"</p>
                <h4>{guest.fName} {guest.lName}</h4>
            </div>
            <div className="guestControls">
                <button onClick={() => deleteGuest(guest)}>Delete</button>
                <button onClick={() => handleEditGuest(guest)}>Edit</button>
            </div>
        </div>
    );
};

export default GuestListItem;