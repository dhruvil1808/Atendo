//create a new session component
import React, { useState, useRef } from "react";
import axios from "axios";
import "../styles/NewSession.css";

const StudentForm = ({ togglePopup }) => {
    //eslint-disable-next-line
    const [auth, setToken] = useState(localStorage.getItem("auth") || "");
    const [image, setImage] = useState({ contentType: "", data: "" });
    const [photoData, setPhotoData] = useState(""); // To store the captured photo data
    const videoRef = useRef(null);

    const constraints = {
        video: true,
    };
    const startCamera = () => {
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                videoRef.current.srcObject = stream;
            })
            .catch((error) => {
                console.error("Error accessing camera:", error);
            });
    };
    const stopCamera = () => {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();

        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
    };
    const capturePhoto = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext("2d").drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

        const photoDataUrl = canvas.toDataURL("image/png");

        setImage(await fetch(photoDataUrl).then(res => res.blob()));

        setPhotoData(photoDataUrl);
        stopCamera();
    };
    const ResetCamera = () => {
        setPhotoData("");
        startCamera();
    };

    const AttendSession = async (e) => {
        e.preventDefault();
        let regno = e.target.regno.value;
        //get user IP address
        let res = await axios.get("https://api.ipify.org/?format=json");
        let IP = res.data.ip;
        if (navigator.geolocation) {
            console.log("Geolocation is supported!");
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    let locationString = `${latitude},${longitude}`;

                    if (regno.length > 0) {
                        const formData = {
                            regno: regno,
                            session_id: localStorage.getItem("session_id"),
                            teacher_email: localStorage.getItem("email"),
                            IP: IP,
                            date: new Date().toISOString().split("T")[0],
                            Location: locationString,
                            student_email: auth,
                            image: image,
                        };
                        try {
                            console.log("sending data to server");
                            const response = await axios.post(
                                "http://localhost:5050/sessions/attend_session",
                                formData
                                , {
                                    headers: {
                                        "Content-Type": "multipart/form-data",
                                    },
                                }
                            );
                            //replace the contents of the popup with the QR code
                            document.querySelector(
                                ".popup-inner"
                            ).innerHTML = `<h5>${response.data.message}</h5>`;
                        } catch (err) {
                            console.error(err);
                        }
                    } else {
                        alert("Please fill all the fields");
                    }
                },
                (error) => {
                    console.error("Error getting geolocation:", error);
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
            console.error("Geolocation is not supported by this browser.");
        }
    };

    return (
        <div className="popup">
            <button onClick={togglePopup}>
                <strong>X</strong>
            </button>
            <div className="popup-inner">
                <h5>Enter Your Details</h5>
                {!photoData && <video ref={videoRef} width={300} autoPlay={true} />}
                {photoData && <img src={photoData} width={300} alt="Captured" />}
                <div>
                    <button onClick={startCamera}>Start Camera</button>
                    <button onClick={capturePhoto}>Capture</button>
                    <button onClick={ResetCamera}>Reset</button>
                </div>

                <form onSubmit={AttendSession}>
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
