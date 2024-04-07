import React, { useEffect, useState } from "react";
import "../styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";




const Signup = () => {
    // eslint-disable-next-line
    const [showPassword, setShowPassword] = useState(false);
    // eslint-disable-next-line
    const [token, setToken] = useState(localStorage.getItem("auth") || "");
    const navigate = useNavigate();

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        let name = e.target.name.value;
        let date = e.target.dob.value;
        let pno = e.target.pno.value;
        let email = e.target.email.value;
        let type = e.target.type.value;
        let password = e.target.password.value;
        let confirmPassword = e.target.confirmPassword.value;

        if (name.length > 0 && email.length > 0 && password.length > 0 && confirmPassword.length > 0) {

            if (password === confirmPassword) {
                const formData = {
                    name,
                    email,
                    password,
                    pno,
                    type,
                    dob: date
                };
                try {
                    const response = await axios.post("http://localhost:5050/users/signup", formData);
                    navigate("/login");
                } catch (err) {
                    console.log(err);
                }
            } else {
                alert("Passwords do not match");
            }
        } else {
            alert("Please fill all the fields");
        }
    }

    const toggleOne = () => {
        document.querySelector(".first-slide").style.display = "block";
        document.querySelector(".second-slide").style.display = "none";
        document.querySelector(".third-slide").style.display = "none";
    }

    const toggleTwo = () => {
        document.querySelector(".first-slide").style.display = "none";
        document.querySelector(".second-slide").style.display = "block";
        document.querySelector(".third-slide").style.display = "none";
    }

    const toggleThree = () => {
        document.querySelector(".first-slide").style.display = "none";
        document.querySelector(".second-slide").style.display = "none";
        document.querySelector(".third-slide").style.display = "block";
    }

    useEffect(() => {
        if (token !== "") {
            navigate("/dashboard");
        }
    }, []);

    return (
        <div className="register-main">
            <div className="register-left">
                <img alt="" />
            </div>
            <div className="register-right">
                <div className="register-right-container">
                    <div className="register-logo">
                        <img alt="" />
                    </div>
                    <div className="register-center">
                        <h2>Welcome to our website!</h2>
                        <p>Please enter your details</p>
                        <form onSubmit={handleRegisterSubmit}>
                            <div className="first-slide">
                                <select name="type" id="type">
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                </select>
                                <input type="text" placeholder="Name" name="name" required={true} />
                                <input type="email" placeholder="Email" name="email" required={true} />
                                <button type="button" onClick={toggleTwo}>Next</button>
                            </div>
                            <div className="second-slide" style={{ display: "none" }}>
                                <input type="text" placeholder="Phone" name="pno" required={true} />
                                <input type="date" name="dob" id="dob" />
                                <button type="button" onClick={toggleOne}>Back</button>
                                <button type="button" onClick={toggleThree}>Next</button>
                            </div>
                            <div className="third-slide" style={{ display: "none" }}>
                                <div className="pass-input-div">
                                    <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required={true} />
                                    {showPassword}

                                </div>
                                <div className="pass-input-div">
                                    <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" required={true} />
                                    {showPassword}

                                </div>
                                <button type="button" onClick={toggleTwo}>Back</button>
                                <div className="register-center-buttons">
                                    <button type="submit">Sign Up</button>
                                </div>
                            </div>

                        </form>
                    </div>

                    <p className="login-bottom-p">
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
