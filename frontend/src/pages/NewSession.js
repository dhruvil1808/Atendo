//create a new session component
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import QRCode from 'qrcode.react';
import "../styles/NewSession.css";

const NewSession = () => {
    const [auth, setToken] = useState(localStorage.getItem("auth") || "");
    const navigate = useNavigate();
    const [qrtoggle, setQrtoggle] = useState(false);
    const [qrData, setQrData] = useState("");

    const createQR = async (e) => {
        e.preventDefault();
        //create a 16 digit UUID
        const uuid = () => {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
                /[xy]/g,
                function (c) {
                    var r = (Math.random() * 16) | 0,
                        v = c === "x" ? r : (r & 0x3) | 0x8;
                    return v.toString(16);
                }
            );
        };
        let session_id = uuid();

        let name = e.target.name.value;
        let date = new Date();
        let duration = e.target.duration.value;
        let radius = e.target.radius.value;
        //get the current location
        let location = "";

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationString = `${latitude},${longitude}`;
                    location = locationString.length > 0 ? locationString : "0,0";
                },
                (error) => {
                    console.error('Error getting geolocation:', error);
                },
                { enableHighAccuracy: true, maximumAge: 0 }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }

        if (name.length > 0 && duration.length > 0) {
            const formData = {
                email: auth,
                session_id,
                date,
                name,
                duration,
                location,
                radius,
            };
            try {
                const response = await axios.post(
                    "http://localhost:5050/sessions/create",
                    formData
                );
                setQrData(response.data.url);
                setQrtoggle(true);

            } catch (err) {
                console.log(err);
            }
        } else {
            alert("Please fill all the fields");
        }
    };

    const copyQR = () => {
        navigator.clipboard.writeText(qrData);
    }

    return (
        <div className="popup">
            {!qrtoggle && <div className="popup-inner">
                <h5>Create a New Session</h5>
                <form onSubmit={createQR}>
                    <input type="text" name="name" placeholder="Session Name" />
                    <input type="text" name="duration" placeholder="Duration" />
                    <select name="radius" id="radius">
                        <option value="50">50 meters</option>
                        <option value="75">75 meters</option>
                        <option value="100">100 meters</option>
                        <option value="150">150 meters</option>
                    </select>
                    <button type="submit">Create Session</button>
                </form>
            </div>}
            {
                qrtoggle && <div className="popup-inner">
                    <QRCode value={qrData} onClick={copyQR} />
                </div>
            }
        </div >
    );
};

export default NewSession;
