import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SHA256 } from "crypto-js";
import axios from "axios";
import "../styles/Login.css";
import image512 from "../assets/logo512.png";
import image192 from "../assets/logo192.png";
import see from "../assets/see.png";
import hide from "../assets/hide.png";

const queryParameters = new URLSearchParams(window.location.search);
axios.defaults.withCredentials = true;

const Login = () => {
  // eslint-disable-next-line
  const [showPassword, setShowPassword] = useState(false);
  // eslint-disable-next-line
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const navigate = useNavigate();

  function computeHash(input) {
    return SHA256(input).toString();
  }

  const handleLoginSubmit = async (e) => {
    let session_id = "";
    let teacher = "";
    try {
      session_id = queryParameters.get("session_id");
      teacher = queryParameters.get("email");
    } catch (err) {
      console.log("No query parameters");
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
        let token = response.data.token;
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", user.name);
        localStorage.setItem("pno", user.pno);
        localStorage.setItem("dob", user.dob);
        localStorage.setItem("type", type);
        localStorage.setItem("token", token);
        if (response.data.type === "student") {
          if (session_id !== "" && teacher !== "") {
            navigate(
              "/student-dashboard?session_id=" +
                session_id +
                "&email=" +
                teacher
            );
          } else {
            navigate("/student-dashboard");
          }
        } else {
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
    let session_id = "";
    let teacher = "";
    try {
      session_id = queryParameters.get("session_id");
      teacher = queryParameters.get("email");
    } catch (err) {
      console.log("No query parameters");
    }
    if (token !== "" && token !== undefined) {
      if (localStorage.getItem("type") === "teacher") {
        navigate("/teacher-dashboard");
      } else {
        if (session_id !== "" && teacher !== "") {
          navigate(
            "/student-dashboard?session_id=" + session_id + "&email=" + teacher
          );
        } else {
          navigate("/student-dashboard");
        }
      }
    }
  }, [token]);

  return (
    <div className="login-main">
      <div className="login-left">
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

              <div className="login-center-options">
                <div className="remember-div"></div>
                <a
                  href="/forgot-password"
                  className="forgot-pass-link"
                  style={{ color: "#76ABAE" }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="login-center-buttons">
                <button type="submit">Log In</button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account?{" "}
            <Link to="/register" style={{ color: "#76ABAE" }}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
