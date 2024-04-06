import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    // eslint-disable-next-line
    const [Sptoken, setToken] = useState(localStorage.getItem("Sptoken") || "");
    // eslint-disable-next-line
    const [Sprefresh_token, setRefreshToken] = useState(
        localStorage.getItem("Sprefresh_token") || ""
    );
    // eslint-disable-next-line
    const [Spexpires_in, setExpiresIn] = useState(
        localStorage.getItem("Spexpires_in") || ""
    );
    // eslint-disable-next-line
    const [auth, setAuth] = useState(localStorage.getItem("auth") || "");

    // eslint-disable-next-line
    const [Yttoken, setYttoken] = useState(localStorage.getItem("Yttoken") || "");
    // eslint-disable-next-line
    const [Ytrefresh_token, setYtRefreshToken] = useState(
        localStorage.getItem("Ytrefresh_token") || ""
    );
    // eslint-disable-next-line
    const [Ytexpires_in, setYtExpiresIn] = useState(
        localStorage.getItem("Ytexpires_in") || ""
    );

    // eslint-disable-next-line
    const [Amtoken, setAmtoken] = useState(localStorage.getItem("Amtoken") || "");
    // eslint-disable-next-line
    const [Amrefresh_token, setAmRefreshToken] = useState(
        localStorage.getItem("Amrefresh_token") || ""
    );
    // eslint-disable-next-line
    const [Amexpires_in, setAmExpiresIn] = useState(
        localStorage.getItem("Amexpires_in") || ""
    );

    const navigate = useNavigate();

    async function handleLoginSpotify() {
        let a = await axios.get("http://localhost:5050/spotify/auth");
        window.location.href = a.data;
    }
    async function saveSpotifyToken() {
        try {
            await axios.post("http://localhost:5050/users/saveToken", {
                token: Sptoken,
                refresh_token: Sprefresh_token,
                expires_in: Spexpires_in,
                auth: auth,
            });
        } catch (err) {
            console.log(err.response.data.message);
        }
    }
    function openSpotify() {
        navigate("/spotify");
    }

    async function handleLoginYoutube() {
        let a = await axios.get("http://localhost:5050/youtube/auth");
        window.location.replace(a.data);
    }
    async function saveYoutubeToken() {
        try {
            await axios.post("http://localhost:5050/users/saveYoutubeToken", {
                token: Yttoken,
                refresh_token: Ytrefresh_token,
                expires_in: Ytexpires_in,
                auth: auth,
            });
        } catch (err) {
            console.log(err.response.data.message);
        }
    }
    function openYoutube() {
        navigate("/youtube");
    }

    async function handleLoginAmazon() {
        navigate("/amazon");
    }
    async function saveAmazonToken() {
        try {
            await axios.post("http://localhost:5050/users/saveAmazonToken", {
                token: Amtoken,
                refresh_token: Amrefresh_token,
                expires_in: Amexpires_in,
                auth: auth,
            });
        } catch (err) {
            console.log(err.response.data.message);
        }
    }
    function openAmazon() {
        navigate("/amazon");
    }


    useEffect(() => {
        if (auth === "") {
            navigate("/login");
        }
    }, [auth]);

    useEffect(() => {
        if (
            Sptoken !== "" &&
            Sprefresh_token !== "" &&
            Spexpires_in !== "" &&
            auth !== ""
        ) {
            document.querySelector(".spotify-login-btn").style.display = "none";
            document.querySelector(".spotify-open-btn").style.display = "block";
            saveSpotifyToken();
        } else {
            document.querySelector(".spotify-login-btn").style.display = "block";
            document.querySelector(".spotify-open-btn").style.display = "none";
        }

        if (
            Yttoken !== "" &&
            Ytrefresh_token !== "" &&
            Ytexpires_in !== "" &&
            auth !== ""
        ) {
            document.querySelector(".youtube-login-btn").style.display = "none";
            document.querySelector(".youtube-open-btn").style.display = "block";
            saveYoutubeToken();
        } else {
            document.querySelector(".youtube-login-btn").style.display = "block";
            document.querySelector(".youtube-open-btn").style.display = "none";
        }

        if (
            Amtoken !== "" &&
            Amrefresh_token !== "" &&
            Amexpires_in !== "" &&
            auth !== ""
        ) {
            document.querySelector(".amazon-login-btn").style.display = "none";
            document.querySelector(".amazon-open-btn").style.display = "block";
            saveAmazonToken();
        } else {
            document.querySelector(".amazon-login-btn").style.display = "block";
            document.querySelector(".amazon-open-btn").style.display = "none";
        }
    }, [Sptoken, Sprefresh_token, Spexpires_in, auth]);

    return (
        <div className="home-container-login">
            <h2>Home</h2>
            <button
                onClick={handleLoginSpotify}
                className="spotify-login-btn login-btn"
            >
                Spotify Login
            </button>
            <button
                onClick={openSpotify}
                className="spotify-open-btn login-btn"
                style={{ display: "none" }}
            >
                Open Spotify
            </button>

            <button
                onClick={handleLoginYoutube}
                className="youtube-login-btn login-btn"
            >
                Youtube Music Login
            </button>
            <button
                onClick={openYoutube}
                className="youtube-open-btn login-btn"
                style={{ display: "none" }}
            >
                Open Youtube Music
            </button>

            <button onClick={handleLoginAmazon} className="amazon-login-btn login-btn">Amazon Music Login</button>
            <button
                onClick={openAmazon}
                className="amazon-open-btn login-btn "
                style={{ display: "none" }}
            >
                Open Amazon Music
            </button>
        </div>
    );
};

export default Dashboard;
