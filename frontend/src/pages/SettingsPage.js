import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/SettingsPage.css"; 

function SettingsPage() {
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
    const handleBorrowed = () => { const userId = localStorage.getItem('userId'); 
        if (userId) {
          navigate(`/borrowed?userId=${userId}`); 
        } else {

          console.log('User ID is missing.');
        }
      };
      const handleSub = () => { const userId = localStorage.getItem('userId'); 
        if (userId) {
          navigate(`/subscription?userId=${userId}`); 
        } else {
    
          console.log('User ID is missing.');
        }
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

                <button className="sidebar-button" onClick={handleBorrowed}>Borrowed</button>                
                
                <button className="sidebar-button" onClick={handleSub}>Subscription</button>
               

              
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

export default SettingsPage;
