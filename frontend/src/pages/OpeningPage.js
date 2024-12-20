import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HomePage.css";

function OpeningPage() {
    const [mediaItems, setMediaItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [warningMessage, setWarningMessage] = useState("");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3001/api/getHomeMedia")
            .then(response => response.json())
            .then(data => setMediaItems(data))
            .catch(error => console.error("Error fetching media:", error));
    }, []);
    useEffect(() => {
            const handleResize = () => {
                if (window.innerWidth < 768) {
                    setIsSidebarOpen(false); 
                } else {
                    setIsSidebarOpen(true); 
                }
            };
            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

    const handleSearch = () => {
        if (searchQuery.trim() === "") {
            setWarningMessage("Search field cannot be empty.");
            return;
        }
        setWarningMessage("");

        fetch(`http://localhost:3001/api/searchMedia?query=${searchQuery}`)
            .then(response => response.json())
            .then(data => setMediaItems(data))
            .catch(error => console.error("Error searching media:", error));
    };

    const handleHomeNavigation = () => {
        setSearchQuery("");
        setWarningMessage("");
        fetch("http://localhost:3001/api/getHomeMedia")
            .then(response => response.json())
            .then(data => setMediaItems(data))
            .catch(error => console.error("Error fetching media:", error));
        navigate("/");
    };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


    const handleNavigation = (path) => {
        navigate(path);
    };

    return (
        <div className="homepage">
    <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
        <h2>AML</h2>
        <button className="sidebar-button" onClick={() => handleNavigation("/")}>
            Home
        </button>
       
    </div>

    <div className="main-content">
        <div className="navbar">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            <div className="search-bar-container">
                <input
                    type="text"
                    placeholder="Search..."
                    className="search-bar"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>
            <div className="navbar-buttons">
                <button 
                    className="login-button"
                    onClick={() => handleNavigation("/login")}
                >
                    Login
                </button>
                <button 
                    className="signup-button"
                    onClick={() => handleNavigation("/signup")}
                >
                    Sign Up
                </button>
            </div>
        </div>

        <div className="content">
            {warningMessage && <div className="warning-message">{warningMessage}</div>}

            <h2>Library</h2>
            <div className="media-grid">
                {mediaItems.map((item) => (
                    <div key={item.id} className="media-item">
                        <img 
                            src={item.image} 
                            alt={item.title} 
                            className="media-image" 
                            onError={(e) => e.target.src = 'fallback-image-url.jpg'} 
                        />
                        <p className="media-title">{item.title}</p>
                        <p>Author: {item.author}</p>
                        <p>Type: {item.type}</p>
                        <p>
                            Availability:
                            <span
                                style={{
                                    color: item.availability === 1 ? 'green' : 'red',
                                    fontWeight: 'bold'
                                }}
                            >
                                {item.availability === 1 ? " Yes" : " No"}
                            </span>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    </div>
</div>

        
    );
}

export default OpeningPage;