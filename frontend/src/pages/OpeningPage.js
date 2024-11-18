import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/OpeningPage.css"; 

function OpeningPage() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path); // navigation to different pages
    };

    return (
        <div className="homepage">
            <div className="sidebar">
                <h2>AML</h2>
                <button 
                    className="sidebar-button"
                    onClick={() => handleNavigation("/")} // for the Home button
                >
                    Home
                </button>
            </div>

            <div className="main-content">
                <div className="navbar">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-bar"
                
                    />
                    <div className="navbar-buttons">
                    <button 
                    className="login-button"
                    onClick={() => handleNavigation("/login")} // for the Home button
                >
                    Login
                </button>
                <button 
                    className="signup-button"
                    onClick={() => handleNavigation("/signup")} // for the Home button
                >
                    Sign Up
                </button>
            </div>
                        
                    
                </div>

            <div className="content">
                    <h2>Home</h2>
                    <p>Library</p>
            </div>
            </div>
        </div>
    );
}

export default OpeningPage;