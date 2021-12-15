import React from 'react'
import GuestListItem from './GuestListItem'

const GuestList = props => {
    const { guests, clickGuest, deleteGuest, editGuest } = props;
    return guests.map(guest => (
        <GuestListItem 
            key={guest.id} 
            guest={guest} 
            clickGuest={clickGuest} 
            deleteGuest={deleteGuest}
            editGuest={editGuest}
        />
    ));
}

export default GuestList;