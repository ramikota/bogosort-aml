import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SettingsPage.css"; 

function ProfilePage() {
    const navigate = useNavigate();
    
    const handleNavigation = (path) => {
        navigate(path); 
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };

    const handleImageButtonClick = () => {
        navigate('/profile'); 
    };

   



    return (
        <div className="homepage">
            <div className="sidebar">
                <h2>AML</h2>
                <button 
                    className="sidebar-button"
                    onClick={() => handleNavigation("/home")}
                >
                    Home
                </button>
                <button className="sidebar-button">Borrowed</button>
                
                <button className="sidebar-button">Subscription</button>
                <button 
                    className="sidebar-button"
                    onClick={() => handleNavigation("/settings")}
                >
                    Settings
                </button>
            </div>

            <div className="main-content">
                <div className="navbar">
                    <h1>Settings</h1>
                    <div className="navbar-buttons">
                        <button className="image-button" onClick={handleImageButtonClick}>
                            <img
                                src="/profile.png"
                                alt="Profile"
                                className="image-icon"
                            />
                        </button>
                        <button className="logout-button" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                </div>

                <div className="content">
                    <h3>Manage Settings</h3>
                

                    
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
