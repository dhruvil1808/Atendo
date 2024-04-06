import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import NewSession from "./NewSession";

const Dashboard = () => {
    const [auth, setToken] = useState(localStorage.getItem("auth") || "");
    const [name, setName] = useState(localStorage.getItem("name") || "");
    const [pno, setPno] = useState(localStorage.getItem("pno") || "");
    const [dob, setDob] = useState(localStorage.getItem("dob") || "");
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();


    const togglePopup = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (auth === "" || auth === undefined) {
            navigate("/login");
        }
    }, []);

    const hideThis = (e) => {
        if (e.target.className === "popup-overlay") {
            togglePopup();
        }
    }

    return (
        <div className="dashboard-main">
            <button onClick={togglePopup}>Create Session</button>
            {isOpen && (
                <div className="popup-overlay" onClick={hideThis}>
                    <NewSession />
                </div>
            )}
        </div>
    );

};

export default Dashboard;
