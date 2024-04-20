import React, { useEffect, useState } from "react";
import "../styles/Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import image512 from "../assets/logo512.png";
import image192 from "../assets/logo192.png";
import { SHA256 } from 'crypto-js';
const queryParameters = new URLSearchParams(window.location.search);


const Login = () => {
    // eslint-disable-next-line
    const [showPassword, setShowPassword] = useState(false);
    // eslint-disable-next-line
    const [auth, setToken] = useState(localStorage.getItem("auth") || "");
    const navigate = useNavigate();

    function computeHash(input) {
        return SHA256(input).toString();
    }

    const handleLoginSubmit = async (e) => {
        let session_id = ""
        let teacher = ""
        try {
            session_id = queryParameters.get("session_id");
            teacher = queryParameters.get("email");
        }
        catch (err) {
            console.log("No query parameters")
        }

        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;

        if (email.length > 0 && password.length > 0) {
            password = computeHash(password);
            password = computeHash(email + password);
            const formData = {
                email,
                password,
            };
            try {
                const response = await axios.post(
                    "http://localhost:5050/users/signin",
                    formData
                );
                let user = response.data.user;
                let type = response.data.type;
                localStorage.setItem('auth', user.email);
                localStorage.setItem('name', user.name);
                localStorage.setItem('pno', user.pno);
                localStorage.setItem('dob', user.dob);
                localStorage.setItem('type', type);
                if (response.data.type === "student") {
                    navigate("/student-dashboard?session_id=" + session_id + "&email=" + teacher);
                }
                else {
                    navigate("/teacher-dashboard");
                }
            } catch (err) {
                alert("Invalid email or password");
                e.target.email.value = "";
                e.target.password.value = "";
            }
        } else {
            alert("Please fill all the fields");
            e.target.email.value = "";
            e.target.password.value = "";
        }
    };

    useEffect(() => {
        if (auth !== "" && auth !== undefined) {
            navigate("/student-dashboard");
        }
    }, [auth]);

    return (
        <div className="login-main">
            <div className="login-left" >
                <img alt="Full" src={image512} />
            </div>
            <div className="login-right">
                <div className="login-right-container">
                    <div className="login-logo">
                        <img alt="logo" src={image192} />
                    </div>
                    <div className="login-center">
                        <h2>Welcome back!</h2>
                        <p>Please enter your details</p>
                        <form onSubmit={handleLoginSubmit}>
                            <input type="email" placeholder="Email" name="email" />
                            <div className="pass-input-div">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Password"
                                    name="password"
                                />
                                {showPassword ? (
                                    <button type="button" onClick={() => { setShowPassword(false) }} style={{ color: "white", padding: 0 }}>hide</button>
                                ) : (
                                    <button type="button" onClick={() => { setShowPassword(true) }} style={{ color: "white", padding: 0 }}>see</button>
                                )}
                            </div>

                            <div className="login-center-options">
                                <div className="remember-div">
                                    <input type="checkbox" id="remember-checkbox" />
                                    <label htmlFor="remember-checkbox">
                                        Remember for 30 days
                                    </label>
                                </div>
                                <a href="/" className="forgot-pass-link">
                                    Forgot password?
                                </a>
                            </div>
                            <div className="login-center-buttons">
                                <button type="submit">Log In</button>
                                <button type="submit">
                                    <img alt="" />
                                    Log In with Google
                                </button>
                            </div>
                        </form>
                    </div>

                    <p className="login-bottom-p">
                        Don't have an account? <Link to="/register">Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
