import React, { useEffect } from 'react'
import "../styles/Logout.css";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("auth");
        localStorage.removeItem("dob");
        localStorage.removeItem("name");
        localStorage.removeItem("pno");
        localStorage.removeItem("type");
        localStorage.removeItem("email");
        localStorage.removeItem("session_id");

        setTimeout(() => {
            navigate("/");
        }, 2000);
    });

    return (
        <div className='logout-main'>
            <h1>Logout Successfull!</h1>
            <p>You will be redirected to the landing page in 2 seconds...</p>
        </div>
    )
}

export default Logout