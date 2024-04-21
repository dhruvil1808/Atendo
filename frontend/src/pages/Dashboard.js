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
    } else {
      updateList();
      document.querySelector(".logout").style.display = "block";
    }
  }, [auth]);

  return (
    <div className="dashboard-main">
      <div className="createbtncol">
        <button onClick={togglePopup} className="createbtn">
          Create Session
        </button>
      </div>
      <div className="session-list">
        <h2>Your Sessions</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Duration</th>
              <th>Location</th>
              <th>Radius</th>
              <th>Action</th>
            </tr>
          </thead>
          {sessionList.length > 0 ? (
            sessionList.map((session, index) => {
              return (
                <tbody key={index}>
                  <tr key={index + "0"} className="session">
                    <th key={index + "2"}>{session.name}</th>
                    <th key={index + "3"}>{session.date.split("T")[0]}</th>
                    <th key={index + "4"}>{session.time}</th>
                    <th key={index + "5"}>{session.duration}</th>
                    <th key={index + "6"}>{session.location}</th>
                    <th key={index + "7"}>{session.radius}</th>
                    <th key={index + "8"}>
                      <button
                        onClick={() => toggleSessionDetails(session.session_id)}
                      >
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
        <div className="popup-overlay">
          <SessionDetails
            currentSession={currentSession}
            toggleSessionDetails={toggleSessionDetails}
          />
        </div>
      )}
      {isOpen && (
        <div className="popup-overlay">
          <NewSession togglePopup={togglePopup} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
