import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SettingsPage.css"; 
import Cookies from 'js-cookie'; 


function SubscriptionPage() {
    const navigate = useNavigate();
    
    const handleNavigation = (path) => {
        navigate(path); 
    };

    const handleLogout = async () => {
        try {
      
         navigate('http://localhost:3001/api/logout', {}, { withCredentials: true });
          Cookies.remove('userId');
          navigate('/');
        } catch (err) {
          console.error('Error during logout', err);
        }
      };

    const handleProfileButtonClick = () => {
        navigate('/profile');
    };

    const handleSettingsButtonClick = () => {
        navigate('/settings');
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
                
                <button 
                    className="sidebar-button"
                    onClick={() => handleNavigation("/subscription")}
                >
                    Subscription
                </button>
                
            </div>

            <div className="main-content">
                <div className="navbar">
                    <h1>Subscription</h1>
                    <div className="navbar-buttons">
                    <button className="image-button" onClick={handleProfileButtonClick}>
                            <img
                                src="/profile.png"
                                alt="Profile"
                                className="image-icon"
                            />
                        </button>
                        <button className="image-button" onClick={handleSettingsButtonClick}>
                            <img
                                src="/settings.png"
                                alt="Settings"
                                className="image-icon"
                            />
                        </button>
                        <button className="logout-button" onClick={handleLogout}>
                            Log Out
                        </button>
                    </div>
                </div>

                <div className="content">
                    <h3>Subscription Status: </h3>
                    <h3>Start Date: </h3>
                    <h3>End Date: </h3>
                

                    
                </div>
            </div>
        </div>
    );
}

export default SubscriptionPage;
