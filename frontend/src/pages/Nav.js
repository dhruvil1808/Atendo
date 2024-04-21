//create a nav bar component
import React from "react";
import "../styles/Nav.css";
import { useEffect, useState } from "react";
import UserDetails from "./UserDetails"; // Assuming both files are in the same directory

const Nav = () => {
    // const [auth, setToken] = useState(localStorage.getItem("auth") || "");
    // eslint-disable-next-line
    const [user, setuser] = useState({
        email: localStorage.getItem("auth"),
        name: localStorage.getItem("name"),
        pno: localStorage.getItem("pno"),
        dob: localStorage.getItem("dob"),
    });

    useEffect(() => {
        //check if user is logged in
        //update the user details
        setuser({
            email: localStorage.getItem("auth"),
            name: localStorage.getItem("name"),
            pno: localStorage.getItem("pno"),
            dob: localStorage.getItem("dob"),
        });
    }, []);

    return (
        <div className="nav-container">
            <nav>
                <ul className="nav-links">
                    <li className="nav-link">
                        <a href="/">Home</a>
                    </li>
                    <li className="nav-link logout" style={{ display: "none" }}>
                        <a href="/logout">Logout</a>
                    </li>
                </ul>
                <UserDetails user={user} />
            </nav>
        </div>
    );
};

export default Nav;
