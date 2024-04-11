import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import NewSession from "./NewSession";
import SessionDetails from "./SessionDetails";

const Dashboard = () => {
    //eslint-disable-next-line
    const [auth, setToken] = useState(localStorage.getItem("auth") || "");
    const [sessionList, setSessionList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isSessionDisplay, setSessionDisplay] = useState(false);
    const [currentSession, setCurrentSession] = useState("");
    const navigate = useNavigate();

    return (
        <div className="dashboard-main">
            <div className="createbtncol"><button className="createbtn" >
                Create Session
            </button></div>
            <div className="session-list">
                <h2>Your Sessions</h2>
                <table>
                    <thead><tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Duration</th>
                        <th>Location</th>
                        <th>Radius</th>
                        <th>Action</th>
                    </tr></thead>
                    {sessionList.length > 0 ? (
                        sessionList.map((session, index) => {
                            return (
                                <tbody key={index}>
                                    <tr key={index + "0"} className="session">
                                        <th key={index + "2"}>{session.name}</th>
                                        <th key={index + "3"}>{session.date.split('T')[0]}</th>
                                        <th key={index + "4"}>{session.time}</th>
                                        <th key={index + "5"}>{session.duration}</th>
                                        <th key={index + "6"}>{session.location}</th>
                                        <th key={index + "7"}>{session.radius}</th>
                                        <th key={index + "8"}>
                                            <button onClick={() => { }}>
                                                Details
                                            </button>
                                        </th>
                                    </tr>
                                </tbody>
                            );
                        })
                    ) : (
                        <tbody>
                            <tr>
                                <td>No sessions found</td>
                            </tr>
                        </tbody>
                    )}
                    <tfoot></tfoot>
                </table>
            </div>
            {isSessionDisplay && (
                <div className="popup-overlay" >
                    <SessionDetails currentSession={currentSession} />
                </div>
            )}
            {isOpen && (
                <div className="popup-overlay">
                    <NewSession />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
