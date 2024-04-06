//create a new session component
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QRCode from 'qrcode.react';
import "../styles/SessionDetails.css";

const NewSession = (props) => {

    const [auth, setToken] = useState(localStorage.getItem("auth") || "");

    const getData = async () => {
        console.log("Getting data");
        // console.log(props.currentSession);
        //display the students that have attended the session
    };

    const navigate = useNavigate();

    return (
        <div className="popup">
            <div className="popup-inner">
                <div className="popup-content">
                    <div className="session-details">
                        {/* <p>Session ID: {props.currentSession[0].session_id}</p> */}
                        <p>Session Name: {props.currentSession[0].name}</p>
                        <p>Session Date: {props.currentSession[0].date}</p>
                        <p>Session Duration: {props.currentSession[0].duration}</p>
                        <p>Session Location: {props.currentSession[0].location}</p>
                        <p>Session QR Code:</p>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default NewSession;
