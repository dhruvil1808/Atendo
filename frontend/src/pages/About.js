import React, { useState } from "react";
import "../styles/About.css";
import signup from "../assets/Signup.png";
import login from "../assets/Login.png";
import teacherd from "../assets/Teacher Dashboard.png";
import teacherd2 from "../assets/Teacher Dashboard 2.png";
import studentd from "../assets/student dashboard.png";
import studentd2 from "../assets/student dashboard 2.png";
import forgorPW from "../assets/Forgot pw.png";
import qr from "../assets/QR.png";
import newSession from "../assets/New Session.png";
import attendance from "../assets/attendance given.png";
import sessionInfo from "../assets/Session Info.png";
import next from "../assets/next.png";
import prev from "../assets/previous.png";
import submitAttendance from "../assets/submit attendance.png";

const assets = [
  {
    image_url: signup,
    title: "Signup",
    caption:
      "Users have to sign up as either a teacher or a student. After signing up, they will receive an OTP on their registered email for authentication. Following this step, new users can set their passwords.",
  },
  {
    image_url: login,
    title: "Login",
    caption:
      "Upon each user login using their email and password credentials, a JSON Web Token (JWT) is generated and issued to facilitate authentication.",
  },
  {
    image_url: teacherd,
    title: "Teacher Dashboard View",
    caption:
      "After a teacher logs in, they gain access to a feature where past attendance sessions are displayed. By clicking on these sessions, the teacher can view detailed information about each session. Additionally, there is a functionality provided for the teacher to create new attendance sessions.",
  },
  {
    image_url: newSession,
    title: "Create New Session",
    caption:
      "Teacher can create a new session by clicking on 'New Session' button. They can set the session name, location, date, time, and the distance parameter for student attendance. The distance parameter is the maximum distance a student can be from the class location to be marked as present.",
  },
  {
    image_url: qr,
    title: "QR Code Generated",
    caption:
      "For each session created, a unique QR code is generated. This QR code is to be scanned by students to mark their attendance. The QR code is displayed on the teacher's screen during the session. This can be viewed by the teacher by clicking on the session in the dashboard.",
  },
  {
    image_url: teacherd2,
    title: "Teacher Dashboard View after creating a session",
    caption: "New Session is Created",
  },
  {
    image_url: studentd,
    title: "Student Dashboard View",
    caption: "After a student logs in, they can view their attendance history.",
  },
  {
    image_url: submitAttendance,
    title: "Submit Attendance",
    caption:
      "Students can submit their attendance by scanning the QR code displayed by the teacher during the session. They have to enter their Roll number and capture a photo. The system will then mark the student as present or absent based on the distance parameter set by the teacher.",
  },
  {
    image_url: attendance,
    title: "Attendance Given",
    caption: "Attendance is successfully submitted",
  },
  {
    image_url: studentd2,
    title: "Student Dashboard View after submitting attendance",
    caption: "Attendance is successfully submitted",
  },
  {
    image_url: sessionInfo,
    title: "Session Info in Teacher Dashboard",
    caption:
      "Upon clicking on a past session, the system presents detailed session information including a QR code, a list of attended students along with their photos taken during attendance registration, and their respective distances from the class or session location. If a student's distance exceeds the parameter set by the teacher, it will be displayed in red; otherwise, it will be shown in green.",
  },
  {
    image_url: forgorPW,
    title: "Forgot Password",
    caption:
      "Users can reset their passwords by clicking on the 'Forgot Password' link on the login page. They will receive an OTP on their registered email for authentication. Following this step, users can set their new passwords.",
  },
];

const About = ({ toggleDone }) => {
  const [active, setActive] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const onNext = () => {
    if (active < assets.length - 1) {
      setActive(active + 1);
    } else {
      toggleDone();
    }
  };

  const onPrev = () => {
    if (active > 0) {
      setActive(active - 1);
    }
  };

  const Slide = ({ image_url, title, caption, active }) => {
    return (
      <div className={`slide ${active ? "active" : ""}`}>
        <img
          src={image_url}
          alt={caption}
          onMouseEnter={() => {
            setShowContent(true);
          }}
          onMouseLeave={() => {
            setShowContent(false);
          }}
        />
        {showContent ? (
          <span
            onMouseEnter={() => {
              setShowContent(true);
            }}
            onMouseLeave={() => {
              setShowContent(false);
            }}
            className="caption"
          >
            <ul>
              <h3>{title}</h3>
              <li>
                <p>{caption}</p>
              </li>
            </ul>
          </span>
        ) : (
          <div></div>
        )}
      </div>
    );
  };

  return (
    <div className="slider">
      <h2>Tutorial</h2>
      <div className="slides">
        {assets.map((e, i) => (
          <Slide key={e.caption} {...e} active={i === active} />
        ))}
      </div>
      <div className="navigation">
        <div className="navigation-bottom">
          {assets.map((e, i) => (
            <button
              className={`preview ${i === active ? "active" : ""}`}
              key={e.caption}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(active)}
              style={{ width: "1px" }}
            />
          ))}
        </div>
        <div className="navigation-next-prev">
          <div className="next-prev prev" onClick={onPrev}>
            {" "}
            <img src={prev} alt="<" />
          </div>
          <div className="next-prev next" onClick={onNext}>
            {" "}
            <img src={next} alt=">" />
          </div>
        </div>
      </div>
      <button className="skipbtn" onClick={toggleDone}>
        Skip
      </button>
    </div>
  );
};

export default About;
