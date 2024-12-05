import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SettingsPage.css"; 
import Cookies from 'js-cookie'; 


function SettingsPage() {
    const navigate = useNavigate();
    
    const handleNavigation = (path) => {
        navigate(path); 
    };

    const handleLogout = async () => {
        try {
      
         navigate('http://localhost:3001/api/logout', {}, { withCredentials: true });
          Cookies.remove('userId');
          Cookies.remove('token');
          navigate('/');
        } catch (err) {
          console.error('Error during logout', err);
        }
      };

    const handleProfileButtonClick = () => {
        navigate('/profile');
    };

    const handleBorrowed = () => {
        const userId = Cookies.get('userId');
    }; 


    const handleSettingsButtonClick = () => {
        navigate('/settings');
    };



        if (userId) {
          navigate(`/borrowed?userId=${userId}`);
        } else {
          console.log('User ID is missing.');
        }
      };
      const handleSub = () => {  const userId = Cookies.get('userId'); 
        if (userId) {
          navigate(`/subscription?userId=${userId}`); 
        } else {
    
          console.log('User ID is missing.');
        }
      
   
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

                <button className="sidebar-button" onClick={handleBorrowed}>Borrowed</button>                
                
                <button className="sidebar-button" onClick={handleSub}>Subscription</button>
               


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
                    <h3>Manage Settings</h3>
                

                    
                </div>
            </div>
        </div>
    );
}

export default SettingsPage;
