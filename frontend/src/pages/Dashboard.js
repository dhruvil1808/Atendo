import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import NewSession from "./NewSession";
import SessionDetails from "./SessionDetails";

const Dashboard = () => {
    const [auth, setToken] = useState(localStorage.getItem("auth") || "");
    const [sessionList, setSessionList] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isSessionDisplay, setSessionDisplay] = useState(false);
    const [currentSession, setCurrentSession] = useState("");
    const navigate = useNavigate();

    //update list of sessions
    const updateList = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5050/sessions/getSessions",
                {
                    email: auth,
                }
            );
            setSessionList(response.data.sessions);
        } catch (err) {
            console.error(err);
        }
    };
    updateList();

    const toggleSessionDetails = (e) => {
        //get the session details that has session_id = e
        setCurrentSession(
            sessionList.filter((session) => {
                return session.session_id === e;
            })
        );
        setSessionDisplay(!isSessionDisplay);
    };

    const togglePopup = () => {
        setIsOpen(!isOpen);
    };
    useEffect(() => {
        if (auth === "" || auth === undefined) {
            navigate("/login");
        }
    }, []);

    return (
        <div className="dashboard-main">
            <button onClick={togglePopup} className="createbtn">
                Create Session
            </button>
            <div className="session-list">
                <h2>Your Sessions</h2>
                <table>
                    <thead></thead>
                    {sessionList.length > 0 ? (
                        sessionList.map((session, index) => {
                            return (
                                <tbody key={index}>
                                    <tr key={index + "0"} className="session">
                                        <th key={index + "2"}>{session.name}</th>
                                        <th key={index + "3"}>{session.date}</th>
                                        <th key={index + "4"}>{session.duration}</th>
                                        <th key={index + "5"}>{session.location}</th>
                                        <th key={index + "6"}>{session.radius}</th>
                                        <th key={index + "7"}>
                                            <button onClick={() => toggleSessionDetails(session.session_id)}>
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
                <div className="popup-overlay" onClick={toggleSessionDetails}>
                    <SessionDetails currentSession={currentSession} />
                </div>
            )}
            {isOpen && (
                <div className="popup-overlay" onClick={togglePopup}>
                    <NewSession />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
