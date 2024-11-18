import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HomePage.css"; 

function HomePage() {
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

export default HomePage;