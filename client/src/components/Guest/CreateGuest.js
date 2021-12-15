import React, { useState } from 'react';
import axios from 'axios';
import {v4 as uuid} from 'uuid';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import './styles.css';

const CreateGuest = ({ onGuestCreated }) => {
    let history = useHistory();
    const [guestData, setGuestData] = useState({
        fName: '',
        lName: '',
        comment: ''
    });
    const { fName, lName, comment } = guestData;

    const onChange = e => {
        const { name, value } = e.target;

        setGuestData({
            ...guestData,
            [name]: value
        });
    };

    const create = async () => {
        if (!fName || !lName || !comment) {
            console.log('Full name and comment are required');
        } else {
            const newGuest = {
                id: uuid(),
                fName: fName,
                lName: lName,
                comment: comment,
                date: moment().toISOString()
            };
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                // Create the guest entry
                const body = JSON.stringify(newGuest);
                const res = await axios.post(
                    'http://localhost:5000/api/guests',
                    body,
                    config
                );
                // Call the handler and redirect
                onGuestCreated(res.data);
                history.push('/');
            } catch (error) {
                console.error(`Error creating guest entry: $(error.response.data)`);
            }
        }
    };

    return (
        <div className="form-container">
            <h1>Add New Guestbook Entry</h1>
            <input
                name="fName"
                type="text"
                placeholder="First Name"
                value={fName}
                onChange={e => onChange(e)}
            />
            <input
                name="lName"
                type="text"
                placeholder="Last Name"
                value={lName}
                onChange={e => onChange(e)}
            />
            <textarea
                name="comment"
                cols="30"
                rows="10"
                placeholder="Enter any comments..."
                value={comment}
                onChange={e => onChange(e)}
            ></textarea>
            <button onClick={() => create()}>Post</button>
        </div>
    );
};

export default CreateGuest;