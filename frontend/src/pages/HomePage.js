import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HomePage.css"; 

function HomePage() {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        navigate(path); // navigation to different pages
    };

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };
    const handleImageButtonClick = () => {
        navigate('/profile'); // for the profile button
    };
    return (
        <div className="homepage">
            <div className="sidebar">
                <h2>AML</h2>
                <button 
                    className="sidebar-button"
                    onClick={() => handleNavigation("/home")} // for the Home button
                >
                    Home
                </button>
                <button className="sidebar-button">Borrowed</button>
                <button className="sidebar-button">Reserved</button>
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
                    <input
                        type="text"
                        placeholder="Search..."
                        className="search-bar"
                
                    />
                    <div className="navbar-buttons">
                        <button className="image-button" onClick={handleImageButtonClick}>
                            <img
                                src="/profile.png"
                                alt="Profile"
                                className="image-icon"
                            />
                        </button>
                        <button className="logout-button" onClick={handleLogout}> {/*for the logout button*/}
                            Log Out
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

export default HomePage;