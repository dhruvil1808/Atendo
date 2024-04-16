//create a new session component
import React, { useEffect, useState } from "react";
import axios from "axios";
import QRCode from 'qrcode.react';
import "../styles/SessionDetails.css";

const SessionDetails = (props) => {
    const [qr, setQR] = useState("");

    async function getQR() {
        await axios.post("http://localhost:5050/sessions/getQR", {
            session_id: props.currentSession[0].session_id,
            email: localStorage.getItem("auth"),
        })
            .then((response) => {
                setQR(response.data.url);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const copyQR = () => {
        navigator.clipboard.writeText(qr);
    };

    useEffect(() => {
        getQR();
    });

    return (
        <div className="popup">
            <button onClick={props.toggleSessionDetails}>
                <strong>X</strong>
            </button>
            <div className="popup-inner">
                <div className="popup-content">
                    <div className="session-details">
                        {/* <p>Session ID: {props.currentSession[0].session_id}</p> */}
                        <p>Session Name: {props.currentSession[0].name}</p>
                        <p>Session Date: {props.currentSession[0].date.split('T')[0]}</p>
                        <p>Session Time: {props.currentSession[0].time}</p>
                        <p>Session Duration: {props.currentSession[0].duration}</p>
                        <p>Session Location: {props.currentSession[0].location}</p>
                    </div>
                    <div className="qr-code">
                        <QRCode value={qr} onClick={copyQR} size={200} />
                        <button onClick={copyQR}>Copy</button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SessionDetails;
