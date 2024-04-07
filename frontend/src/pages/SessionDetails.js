//create a new session component
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QRCode from 'qrcode.react';
import "../styles/SessionDetails.css";

const NewSession = (props) => {

    const [auth, setToken] = useState(localStorage.getItem("auth") || "");

    const getQR = async () => {
        axios.post("http://localhost:5000/sessions/getQR", {
            session_id: props.currentSession[0].session_id,
        })
            .then((response) => {
                console.log(response.data.url);
                return response.data.url;
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="popup">
            <div className="popup-inner">
                <div className="popup-content">
                    <div className="session-details">
                        {/* <p>Session ID: {props.currentSession[0].session_id}</p> */}
                        <p>Session Name: {props.currentSession[0].name}</p>
                        <p>Session Date: {props.currentSession[0].date.toISOString().split('T')[0]}</p>
                        <p>Session Duration: {props.currentSession[0].duration}</p>
                        <p>Session Location: {props.currentSession[0].location}</p>
                        <p>Session QR Code:</p>
                        <QRCode value={getQR} />
                    </div>
                </div>
            </div>
        </div >
    );
};

export default NewSession;
