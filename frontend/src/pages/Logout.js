import React, { useEffect } from 'react'
import "../styles/Logout.css";
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem("auth");
        localStorage.removeItem("Sptoken");
        localStorage.removeItem("Spexpires_in");
        localStorage.removeItem("Sprefresh_token");
        localStorage.removeItem("Yttoken");
        localStorage.removeItem("Ytexpires_in");
        localStorage.removeItem("Ytrefresh_token");
        localStorage.removeItem("Amtoken");
        localStorage.removeItem("Amexpires_in");
        localStorage.removeItem("Amrefresh_token");
        localStorage.removeItem("dob");
        localStorage.removeItem("name");
        localStorage.removeItem("pno");


        setTimeout(() => {
            navigate("/");
        }, 3000);
    }, []);

    return (
        <div className='logout-main'>
            <h1>Logout Successfull!</h1>
            <p>You will be redirected to the landing page in 3 seconds...</p>
        </div>
    )
}

export default Logout