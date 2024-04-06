//create a nav bar component
import React from "react";
import "../styles/Nav.css";
import { useEffect, useState } from "react";
import UserDetails from "./UserDetails"; // Assuming both files are in the same directory

const Nav = () => {
    const [showUserDetails, setShowUserDetails] = useState(false);

    // Mock user data
    // eslint-disable-next-line
    const [user, setuser] = useState({
        email: localStorage.getItem("auth"),
        name: localStorage.getItem("name"),
        pno: localStorage.getItem("pno"),
        dob: localStorage.getItem("dob"),
    });

    const toggleUserDetails = () => {
        setShowUserDetails(!showUserDetails);
    };

    useEffect(() => {
        if (localStorage.getItem("auth") === null) {
            document.querySelector(".logout").style.display = "none";
        }
        else {
            document.querySelector(".logout").style.display = "block";
        }
    });

    return (
        <div className="nav-container">
            <nav>
                <ul className="nav-links">
                    <li className="nav-link">
                        <a href="/dashboard">Home</a>
                    </li>
                    <li className="nav-link logout">
                        <a href="/logout">Logout</a>
                    </li>
                </ul>
                <UserDetails user={user} onClick={toggleUserDetails} />
                {showUserDetails && (
                    <div className="user-details-container">
                        <p>Username: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <p>Phone Number: {user.pno}</p>
                        <p>Date of Birth: {user.dob}</p>
                    </div>
                )}
            </nav>
        </div>
    );
};

export default Nav;
