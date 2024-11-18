import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HomePage.css"; 

function HomePage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };

    return (
        <div className="homepage">
            <div className="sidebar">
                <h2>SIDEBAR</h2>
                <button className="sidebar-button">HomePage</button>
                <button className="sidebar-button">Media</button>
                <button className="sidebar-button">Profile</button>
                <button className="sidebar-button">Subsciption</button>
            </div>

            <div className="main-content">
                <div className="navbar">
                    <h1>Bogosort AML Library</h1>
                    <button className="logout-button" onClick={handleLogout}>
                        Log Out
                    </button>
                </div>

                <div className="content">
                    <h2>Homepage</h2>
                    <p>Media here</p>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
