import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/StudentDashboard.css";
import { useNavigate } from "react-router-dom";
import StudentForm from "./StudentForm";
const queryParameters = new URLSearchParams(window.location.search);

const Dashboard = () => {
  //eslint-disable-next-line
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  // eslint-disable-next-line
  const [sessionList, setSessionList] = useState([]);
  const [isSessionDisplay, setSessionDisplay] = useState(false);
  const navigate = useNavigate();

  function getStudentSessions() {
    axios
      .post("http://localhost:5050/sessions/getStudentSessions", {
        token: token,
      })
      .then((response) => {
        setSessionList(response.data.sessions);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function toggleStudentForm(action) {
    if (action === "open") {
      setSessionDisplay(true);
    } else {
      localStorage.removeItem("session_id");
      localStorage.removeItem("teacher_email");
      setSessionDisplay(false);
      navigate("/student-dashboard");
    }
  }

  function getDistance(distance, radius) {
    return {
      distance,
      color: distance <= parseFloat(radius) ? "green" : "red",
    };
  }

  useEffect(() => {
    if (token === "" || token === undefined) {
      navigate("/login");
    } else {
      getStudentSessions();
      document.querySelector(".logout").style.display = "block";
      try {
        if (
          queryParameters.get("session_id") !== null &&
          queryParameters.get("email") !== null
        ) {
          localStorage.setItem("session_id", queryParameters.get("session_id"));
          localStorage.setItem("teacher_email", queryParameters.get("email"));
        }
        if (
          localStorage.getItem("session_id") == null &&
          localStorage.getItem("teacher_email") == null
        ) {
          toggleStudentForm("close");
        } else {
          toggleStudentForm("open");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }, [token]);

  return (
    <div className="dashboard-main">
      {!isSessionDisplay && (
        <div className="session-list">
          <h2>Your Sessions</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Image</th>
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
                      <th
                        key={index + "6"}
                        className="distance"
                        style={{
                          color: getDistance(session.distance, session.radius)
                            .color,
                        }}
                      >
                        {getDistance(session.distance, session.radius).distance}
                      </th>
                      <th key={index + "7"}>
                        <img src={session.image} alt="session" width={200} />
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
      )}
      {isSessionDisplay && (
        <div className="popup-overlay">
          <StudentForm togglePopup={toggleStudentForm} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
