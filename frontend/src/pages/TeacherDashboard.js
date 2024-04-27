import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Dashboard.css";
import { useNavigate } from "react-router-dom";
import NewSession from "./NewSession";
import SessionDetails from "./SessionDetails";

axios.defaults.withCredentials = true;

const TeacherDashboard = () => {
  //eslint-disable-next-line
  const [token, setToken] = useState(localStorage.getItem("token") || "");
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
          token: token,
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
    if (token === "" || token === undefined) {
      navigate("/login");
    } else {
      updateList();
      document.querySelector(".logout").style.display = "block";
    }
  }, [token]);

  const FlashCard = ({ session }) => {
    return (
      <div
        className="flashcard"
        onClick={() => toggleSessionDetails(session.session_id)}
      >
        <div className="front">
          <h4>{session.name}</h4>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-main">
      <div className="row1">
        <div className="heading">
          <h2>Your Sessions</h2>
        </div>
        <div className="createbtncol">
          <button onClick={togglePopup} className="createbtn">
            Create Session
          </button>
        </div>
      </div>
      <div className="session-list">
        {sessionList.length > 0 ? (
          sessionList.map((session, index) => {
            return (
              <div
                key={index + session.session_id}
                className="flashcard"
                onClick={() => {
                  toggleSessionDetails(session.session_id);
                }}
              >
                <FlashCard session={session} />
              </div>
            );
          })
        ) : (
          <p>No sessions found</p>
        )}
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

export default TeacherDashboard;
