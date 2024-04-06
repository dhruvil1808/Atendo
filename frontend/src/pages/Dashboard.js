import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const [auth, setToken] = useState(localStorage.getItem("auth") || "");
    const [name, setName] = useState(localStorage.getItem("name") || "");
    const [pno, setPno] = useState(localStorage.getItem("pno") || "");
    const [dob, setDob] = useState(localStorage.getItem("dob") || "");

    const navigate = useNavigate();

    useEffect(() => {
        if (auth === "" || auth === undefined) {
            navigate("/login");
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <div className="dashboard-main">
            <div className="dashboard-left">
                <h1>Welcome to Dashboard</h1>

            </div>
            <div className="dashboard-right">
                <h1>Dashboard</h1>
            </div>
        </div>
    );

};

export default Dashboard;
