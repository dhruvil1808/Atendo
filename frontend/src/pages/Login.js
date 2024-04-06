import React, { useEffect, useState } from "react";
import "../styles/Signin.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
    // eslint-disable-next-line
    const [showPassword, setShowPassword] = useState(false);
    // eslint-disable-next-line
    const [auth, setToken] = useState(localStorage.getItem("auth") || "");
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        let email = e.target.email.value;
        let password = e.target.password.value;

        if (email.length > 0 && password.length > 0) {
            const formData = {
                email,
                password,
            };
            try {
                const response = await axios.post(
                    "http://localhost:5050/users/signin",
                    formData
                );
                localStorage.setItem('auth', response.data.email);
                localStorage.setItem('name', response.data.name);
                localStorage.setItem('pno', response.data.pno);
                localStorage.setItem('dob', response.data.dob);
                navigate("/dashboard");
            } catch (err) {
                alert("Invalid email or password");
                //clear the form
                e.target.email.value = "";
                e.target.password.value = "";
            }
        } else {
            alert("Please fill all the fields");
            //clear the form
            e.target.email.value = "";
            e.target.password.value = "";

        }
    };

    useEffect(() => {
        if (auth !== "" && auth !== undefined) {
            navigate("/dashboard");
        }
    }, []);

    return (
        <div className="login-main">
            <div className="login-left">
                <img alt="" />
            </div>
            <div className="login-right">
                <div className="login-right-container">
                    <div className="login-logo">
                        <img alt="" />
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
                                    console.log("show")
                                ) : (
                                    console.log("hide")
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
