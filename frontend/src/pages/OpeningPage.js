import React from "react";
import "../styles/Login.css"; 
function OpeningPage() {
    return (
        <div className="home-container">
            <h1 className="home-header">Bogosort AML Library</h1>
            <p className="home-description">
                Please log in or sign up.
            </p>
            <div className="home-links">
                <a href="/login" className="home-link">
                    Login
                </a>
                <a href="/signup" className="home-link">
                    Sign Up
                </a>
            </div>
        </div>
    );
}

export default OpeningPage;
