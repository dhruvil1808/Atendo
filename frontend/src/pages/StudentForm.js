//create a new session component
import React, { useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import "../styles/NewSession.css";

const StudentForm = ({ togglePopup }) => {
    //eslint-disable-next-line
    const [auth, setToken] = useState(localStorage.getItem("auth") || "");
    const [qrData, setQrData] = useState("");

    const AttendSession = async (e) => {
        e.preventDefault();
        let regno = e.target.regno.value;
        //get user IP address
        let IP = "";

        if (regno.length > 0) {
            const formData = {
                regno,
                IP,
            };
            try {
                const response = await axios.post(
                    "http://localhost:5050/sessions/attend_session",
                    formData
                );
            } catch (err) {
                console.error(err);
            }
        } else {
            alert("Please fill all the fields");
        }
    };

    const copyQR = () => {
        navigator.clipboard.writeText(qrData);
    };

    return (
        <div className="popup">
            <button onClick={togglePopup}>
                <strong>X</strong>
            </button>
            <div className="popup-inner">
                <h5>Enter Your Details</h5>
                <form onSubmit={AttendSession} >
                    <input
                        type="text"
                        name="regno"
                        placeholder="RegNo"
                        autoComplete="off"
                    />
                    <button type="submit">Done</button>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
