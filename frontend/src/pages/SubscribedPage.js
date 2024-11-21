import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SubscribedPage.css";

function SubscribedPage() {
    const navigate = useNavigate();

    const handleGoToLogin = () => {
        navigate('/login'); 
    };

    return (
        <div className="thank-you-container">
            <h1>Thank You for Subscribing!</h1>
            <p>You are now a member of the A Media Library!</p>
            <button className="go-to-login-button" onClick={handleGoToLogin}>
                Go to Login
            </button>
        </div>
    );
}

export default SubscribedPage;
