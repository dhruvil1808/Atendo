//create a new session component
import React, { useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";
import "../styles/NewSession.css";

const NewSession = ({ togglePopup }) => {
  //eslint-disable-next-line
  const [token, setToken] = useState(localStorage.getItem("token") || "");
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
    //get the date in the format yyyy-mm-dd
    date = date.toISOString().split("T")[0];
    let time = e.target.time.value;
    let duration = e.target.duration.value;
    let radius = e.target.radius.value;
    //get the current location
    let location = "";

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const locationString = `${latitude},${longitude}`;
          location = locationString.length > 0 ? locationString : "0,0";
          if (name.length > 0 && duration.length > 0) {
            const formData = {
              token,
              session_id,
              date,
              time,
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
              console.log("Error creating session");
              console.log(err);
            }
          } else {
            alert("Please fill all the fields");
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        },
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      alert("Geolocation is not supported by this browser.");
    }
  };

  const copyQR = () => {
    navigator.clipboard.writeText(qrData);
  };

  return (
    <div className="new-popup">
      <button onClick={togglePopup}>
        <strong>X</strong>
      </button>
      {!qrtoggle && (
        <div className="popup-inner">
          <h5>Create a New Session</h5>
          <form onSubmit={createQR}>
            <input
              type="text"
              name="name"
              placeholder="Session Name"
              autoComplete="off"
            />
            <input
              type="text"
              name="duration"
              placeholder="Duration"
              autoComplete="off"
            />
            <input
              type="text"
              name="time"
              placeholder="Time"
              autoComplete="off"
            />
            <select name="radius" id="radius" autoComplete="off">
              <option value="50">50 meters</option>
              <option value="75">75 meters</option>
              <option value="100">100 meters</option>
              <option value="150">150 meters</option>
            </select>
            <button type="submit">Create Session</button>
          </form>
        </div>
      )}
      {qrtoggle && (
        <div className="qr-code">
          <QRCode value={qrData} onClick={copyQR} size={200} />
          <button onClick={copyQR}>Copy</button>
        </div>
      )}
    </div>
  );
};

export default NewSession;
