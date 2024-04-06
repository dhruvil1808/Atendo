import React from 'react';

const UserDetails = ({ user, onClick }) => {
    return (
        <div className="user-details" onClick={onClick}>
            <span className="username">{user.name}</span>
        </div>
    );
};

export default UserDetails;