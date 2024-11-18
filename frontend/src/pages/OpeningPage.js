import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/OpeningPage.css"; 

function OpeningPage() {
    const mediaItems = [
        { id: 1, title: "Harry Potter And The Deathly Hallows", imageUrl: "/media/book1.jpg" },
        { id: 2, title: "James And The Giant Peach", imageUrl: "/media/book2.jpg" },
        { id: 3, title: "The Imperfections Of Memory", imageUrl: "/media/book3.jpg" },
        { id: 4, title: "A Million To One", imageUrl: "/media/book4.jpg" },
        { id: 5, title: "The Lord Of The Rings", imageUrl: "/media/book5.jpg" }
    ];
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
                    <div className="media-grid">
                    {mediaItems.map((item) => (
                        <div key={item.id} className="media-item">
                            <img src={item.imageUrl} alt={item.title} className="media-image" />
                            <p className="media-title">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
            </div>
        </div>
    );
}

export default OpeningPage;