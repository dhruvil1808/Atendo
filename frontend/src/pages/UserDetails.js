import React from "react";
import { useState } from "react";
import "../styles/UserDetails.css";

const UserDetails = ({ user }) => {
  //eslint-disable-next-line
  const [showUserDetails, setShowUserDetails] = useState(false);

  const onClick = () => {
    setShowUserDetails(!showUserDetails);
  };

  function getInitials(name) {
    if (!name) return "";
    const names = name.split(" ");
    return names[0][0] + names[names.length - 1][0];
  }

  return (
    <div className="user-details" onClick={onClick}>
      {user.name ? (
        <div className="user-icon">
          <h3 style={{ color: "black", fontSize: "15px" }}>
            {getInitials(user.name)}
          </h3>
        </div>
      ) : (
        <div></div>
      )}
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
