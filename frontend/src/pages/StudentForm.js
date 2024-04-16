//create a new session component
import React, { useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import "../styles/NewSession.css";

const StudentForm = ({ togglePopup }) => {
    //eslint-disable-next-line
    const [auth, setToken] = useState(localStorage.getItem("auth") || "");
    const [image, setImage] = useState({ preview: "", data: "" });
    const [status, setStatus] = useState('')

    const handleFileChange = (e) => {
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        }
        setImage(img)
    }

    const AttendSession = async (e) => {
        e.preventDefault();
        let regno = e.target.regno.value;
        //get the image

        //get user IP address
        let res = await axios.get("https://api.ipify.org/?format=json");
        let IP = res.data.ip
        let location = "";
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const locationString = `${latitude},${longitude}`;
                    location = locationString.length > 0 ? locationString : "0,0";
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                },
                { enableHighAccuracy: true, maximumAge: 0 }
            );
        } else {
            console.error("Geolocation is not supported by this browser.");
        }

        if (regno.length > 0) {
            const formData = {
                regno: regno,
                session_id: localStorage.getItem("session_id"),
                teacher_email: localStorage.getItem("email"),
                IP: IP,
                Location: location,
                student_email: auth,
                image: image.data
            }
            console.log(formData)
            try {
                const response = await axios.post(
                    "http://localhost:5050/sessions/attend_session",
                    formData, { headers: { 'Content-Type': 'multipart/form-data' } }
                );
                console.log(response.data);
                //replace the contents of the popup with the QR code
                document.querySelector(".popup-inner").innerHTML = `<h5>Attendance Marked</h5>`;
            } catch (err) {
                console.error(err);
            }
        } else {
            alert("Please fill all the fields");
        }
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
                    <input type='file' name='file' onChange={handleFileChange}></input>
                    {image.preview && <img src={image.preview} width='200' />}
                    <button type="submit">Done</button>
                </form>
            </div>
        </div>
    );
};

export default StudentForm;
