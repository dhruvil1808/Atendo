import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import StudentForm from "./StudentForm";

const Dashboard = () => {
    //eslint-disable-next-line
    const [auth, setToken] = useState(localStorage.getItem("auth") || "");
    const [session_id, setSession] = useState(localStorage.getItem("session_id") || "");
    const [sessionList, setSessionList] = useState([]);
    const [isSessionDisplay, setSessionDisplay] = useState(false);
    const navigate = useNavigate();

    function getStudentSessions() {
        axios.post("http://localhost:5050/sessions/getStudentSessions", {
            email: auth,
        })
            .then((response) => {
                console.log(response.data);
                setSessionList(response.data.sessions);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function toggleStudentForm() {
        setSessionDisplay(!isSessionDisplay);
        localStorage.removeItem("session_id");
        localStorage.removeItem("email");
    }

    useEffect(() => {
        if (session_id !== "" && session_id !== undefined) {
            setSessionDisplay(true);
        }
    }, []);


    useEffect(() => {
        if (auth === "" || auth === undefined) {
            navigate("/login");
        }
        else {
            getStudentSessions();
            document.querySelector(".logout").style.display = "block";
        }
    }, [auth]);

    return (
        <div className="dashboard-main">
            {!isSessionDisplay && (
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
                </div>)}
            {isSessionDisplay && (
                <div className="popup-overlay">
                    <StudentForm togglePopup={toggleStudentForm} />
                </div>
            )}
        </div>
    );
};

export default Dashboard;
