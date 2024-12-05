import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HomePage.css";
import Cookies from 'js-cookie'; 

function HomePage() {
    const [mediaItems, setMediaItems] = useState([]);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [warningMessage, setWarningMessage] = useState("");
 
    useEffect(() => {
        fetch("http://localhost:3001/api/getHomeMedia")
            .then(response => response.json())
            .then(data => setMediaItems(data))
            .catch(error => console.error("Error fetching media:", error));
    }, []);

    const handleBorrowed = () => { const userId = Cookies.get('userId');
        if (userId) {
          navigate(`/borrowed?userId=${userId}`); 
          
        } else {

          console.log('User ID is missing.');
        }
      };
      const handleSub = () => { const userId = Cookies.get('userId');
        if (userId) {
          navigate(`/subscription?userId=${userId}`); 
        } else {
    
          console.log('User ID is missing.');
        }
      };

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

    const handleMediaClick = (mediaId) => {
        navigate(`/media/${mediaId}`);
        
    };


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

    const handleImageButtonClick = () => {
        navigate('/profile');
    };

    return (
        <div className="homepage">
            <div className="sidebar">
                <h2>AML</h2>
                <button className="sidebar-button" onClick={() => handleNavigation("/home")}>
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
                {warningMessage && <div className="warning-message">{warningMessage}</div>}
                <div className="content">
                    <h2>Library</h2>
                    <div className="media-grid">
                        {mediaItems.map((item) => (
                            <div 
                                key={item.id} 
                                className="media-item" 
                                onClick={() => handleMediaClick(item.id)} 
                            >
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="media-image" 
                                />
                                <p className="media-title">{item.title}</p>
                                <p>Author: {item.author}</p>
                                <p>Type: {item.type}</p>
                                <p>Availability:  
                                   <span 
                                     style={{
                                        color: item.availability === 1 ? 'green' : 'red', 
                                        fontWeight: 'bold'
                                       }} >
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

export default HomePage;