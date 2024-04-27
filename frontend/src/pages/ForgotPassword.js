import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import image512 from "../assets/logo512.png";
import image192 from "../assets/logo192.png";
import { SHA256 } from "crypto-js";

const ForgotPassword = () => {
  // eslint-disable-next-line
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [SaveOTP, setOtp] = useState(
    Math.floor(100000 + Math.random() * 900000) || 0
  );
  const navigate = useNavigate();

  function computeHash(input) {
    return SHA256(input).toString();
  }

  const toggleTwo = async (e) => {
    e.preventDefault();
    const email = document.querySelector("input[name=email]").value;
    if (email === "") {
      alert("Please enter your email");
      return;
    }
    try {
      document.querySelector(".page1").style.display = "none";
      document.querySelector(".page2").style.display = "block";
      await axios
        .post("http://localhost:5050/users/sendmail", {
          email: email,
        })
        .then((res) => {
          setOtp(res.data.otp);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      alert("Error sending OTP");
    }
  };

  const toggleThree = async (e) => {
    e.preventDefault();
    const otp = document.querySelector("input[name=otp]").value;
    if (otp === "") {
      alert("Please enter OTP");
      return;
    }
    if (parseInt(otp) === parseInt(SaveOTP)) {
      document.querySelector(".page2").style.display = "none";
      document.querySelector(".page3").style.display = "block";
    } else {
      alert("Invalid OTP");
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let password = document.querySelector("input[name=password]").value;
    const cpassword = document.querySelector("input[name=cpassword]").value;
    if (password.length > 0 && cpassword.length > 0) {
      if (password === cpassword) {
        const email = document.querySelector("input[name=email]").value;
        password = computeHash(password);
        password = computeHash(email + password);

        const formData = {
          email,
          password,
        };
        try {
          await axios.post(
            "http://localhost:5050/users/forgotpassword",
            formData
          );
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
  };

  useEffect(() => {
    if (token !== "") {
      navigate("/dashboard");
    }
  });

  return (
    <div className="register-main">
      <div className="register-left">
        <img alt="Full" src={image512} />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-logo">
            <img alt="logo" src={image192} />
          </div>
          <div className="register-center">
            <h2>Forgot your Password?</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="page1">
                <p>Please enter your Email Id</p>
                <input type="email" placeholder="Email" required name="email" />
                <button type="button" onClick={toggleTwo}>
                  Send OTP
                </button>
              </div>
              <div className="page2" style={{ display: "none" }}>
                <p>Please enter OTP</p>
                <input
                  type="text"
                  placeholder="OTP"
                  name="otp"
                  required={true}
                />
                <button type="button" onClick={toggleThree}>
                  Submit
                </button>
              </div>
              <div className="page3" style={{ display: "none" }}>
                <p>Please enter new password</p>
                <input
                  type="password"
                  placeholder="New Password"
                  required
                  name="password"
                />
                <input
                  type="password"
                  placeholder=" Confirm New Password"
                  required
                  name="cpassword"
                />
                <button type="submit">Change Password</button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#76ABAE" }}>
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
