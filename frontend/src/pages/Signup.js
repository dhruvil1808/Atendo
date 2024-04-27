import React, { useEffect, useState } from "react";
import "../styles/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import image512 from "../assets/logo512.png";
import image192 from "../assets/logo192.png";
import { SHA256 } from "crypto-js";
import see from "../assets/see.png";
import hide from "../assets/hide.png";

const Signup = () => {
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

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let date = e.target.dob.value;
    let pno = e.target.pno.value;
    let email = e.target.email.value;
    let type = e.target.type.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;

    if (password.length > 0 && confirmPassword.length > 0) {
      if (password === confirmPassword) {
        password = computeHash(password);
        //add email to the password to make it unique
        password = computeHash(email + password);
        const formData = {
          name,
          email,
          password,
          pno,
          type,
          dob: date,
        };
        try {
          await axios.post("http://localhost:5050/users/signup", formData);
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

  const toggleOne = () => {
    document.querySelector(".first-slide").style.display = "block";
    document.querySelector(".second-slide").style.display = "none";
    document.querySelector(".third-slide").style.display = "none";
    document.querySelector(".fourth-slide").style.display = "none";
  };

  const toggleTwo = async () => {
    let name = document.querySelector("input[name='name']").value;
    let email = document.querySelector("input[name='email']").value;

    if (name.length === 0 || email.length === 0) {
      alert("Please fill all the fields");
      return;
    } else {
      document.querySelector(".first-slide").style.display = "none";
      document.querySelector(".second-slide").style.display = "block";
      document.querySelector(".third-slide").style.display = "none";
      document.querySelector(".fourth-slide").style.display = "none";
    }

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
  };

  const toggleThree = () => {
    //check if the otp is correct and then move to the next slide
    let otp = document.querySelector("input[name='otp']").value;
    if (otp.length === 0) {
      alert("Please Enter OTP");
    } else {
      if (parseInt(otp) === parseInt(SaveOTP)) {
        document.querySelector(".first-slide").style.display = "none";
        document.querySelector(".second-slide").style.display = "none";
        document.querySelector(".third-slide").style.display = "block";
        document.querySelector(".fourth-slide").style.display = "none";
      } else {
        alert("Invalid OTP");
      }
    }
  };

  const toggleFour = () => {
    let pno = document.querySelector("input[name='pno']").value;
    let dob = document.querySelector("input[name='dob']").value;
    if (pno.length === 0 || dob.length === 0) {
      alert("Please fill all the fields");
    } else {
      document.querySelector(".first-slide").style.display = "none";
      document.querySelector(".second-slide").style.display = "none";
      document.querySelector(".third-slide").style.display = "none";
      document.querySelector(".fourth-slide").style.display = "block";
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
            <h2>Welcome to our website!</h2>
            <p>Please enter your details</p>
            <form onSubmit={handleRegisterSubmit}>
              <div className="first-slide">
                <select name="type" id="type">
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  required={true}
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required={true}
                />
                <button type="button" onClick={toggleTwo}>
                  Next
                </button>
              </div>
              <div className="second-slide" style={{ display: "none" }}>
                <input
                  type="text"
                  placeholder="OTP"
                  name="otp"
                  required={true}
                />
                <button type="button" onClick={toggleOne}>
                  Edit Email
                </button>
                <button type="button" onClick={toggleThree}>
                  Submit
                </button>
              </div>
              <div className="third-slide" style={{ display: "none" }}>
                <input
                  type="text"
                  placeholder="Phone"
                  name="pno"
                  required={true}
                />
                <input type="date" name="dob" id="dob" />
                <button type="button" onClick={toggleOne}>
                  Back
                </button>
                <button type="button" onClick={toggleFour}>
                  Next
                </button>
              </div>
              <div className="fourth-slide" style={{ display: "none" }}>
                <div className="pass-input-div">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    name="password"
                    required={true}
                  />
                  {showPassword ? (
                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword(false);
                      }}
                      style={{ color: "white", padding: 0 }}
                    >
                      <img className="hide" src={hide} alt="hide" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword(true);
                      }}
                      style={{ color: "white", padding: 0 }}
                    >
                      <img className="see" src={see} alt="see" />
                    </button>
                  )}
                </div>
                <div className="pass-input-div">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    required={true}
                  />
                  {showPassword ? (
                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword(false);
                      }}
                      style={{ color: "white", padding: 0 }}
                    >
                      <img className="hide" src={hide} alt="hide" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setShowPassword(true);
                      }}
                      style={{ color: "white", padding: 0 }}
                    >
                      <img className="see" src={see} alt="see" />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={toggleThree}
                  style={{ width: 100 + "%", marginBottom: 10 + "px" }}
                >
                  Back
                </button>
                <div className="register-center-buttons">
                  <button type="submit">Sign Up</button>
                </div>
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

export default Signup;
