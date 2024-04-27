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
import newSSession from "../assets/New Session.png";
import attendance from "../assets/attendance given.png";
import sessionInfo from "../assets/Session Info.png";
import next from "../assets/next.png";
import prev from "../assets/previous.png";
import submitAttendance from "../assets/submit attendance.png";

const assets = [
  {
    image_url: signup,
    caption: "Signup",
  },
  {
    image_url: login,
    caption: "Login",
  },
  {
    image_url: teacherd,
    caption: "Teacher Dashboard",
  },
  {
    image_url: teacherd2,
    caption: "Teacher Dashboard 2",
  },
  {
    image_url: studentd,
    caption: "Student Dashboard",
  },
  {
    image_url: studentd2,
    caption: "Student Dashboard 2",
  },
  {
    image_url: forgorPW,
    caption: "Forgot Password",
  },
  {
    image_url: qr,
    caption: "QR Code",
  },
  {
    image_url: newSSession,
    caption: "New Session",
  },
  {
    image_url: attendance,
    caption: "Attendance Given",
  },
  {
    image_url: sessionInfo,
    caption: "Session Info",
  },
  {
    image_url: submitAttendance,
    caption: "Submit Attendance",
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

  const Slide = ({ image_url, caption, active }) => {
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
        {showContent ? <span className="caption">{caption}</span> : <div></div>}
      </div>
    );
  };

  return (
    <div className="slider">
      <button onClick={toggleDone}>Skip</button>
      <div className="slides">
        {assets.map((e, i) => (
          <Slide key={e.caption} {...e} active={i === active} />
        ))}
      </div>
      <div className="navigation">
        <div class="navigation-bottom">
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
          <div class="next-prev prev" onClick={onPrev}>
            {" "}
            <img src={prev} alt="<" />
          </div>
          <div class="next-prev next" onClick={onNext}>
            {" "}
            <img src={next} alt=">" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
