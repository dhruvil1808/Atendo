import React from 'react';
import { useState } from 'react';
import '../styles/UserDetails.css';

const UserDetails = ({ user, onClick }) => {
    const [showUserDetails, setShowUserDetails] = useState(false);

    function onClick() {
        setShowUserDetails(!showUserDetails);
    }

    return (
        <div className="user-details" onClick={onClick}>
            <h5 className="username">{user.name}</h5>
            {showUserDetails && (
                <div className="user-details-container">
                    <div className="user-details-popup">
                        <p>Username: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone Number: {user.pno}</p>
                        <p>Date of Birth: {user.dob}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDetails;