import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HomePage.css"; 
import Cookies from 'js-cookie'; 


function ProfilePage() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

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
    
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [message, setMessage] = useState("");

    const handleNavigation = (path) => {
        navigate(path); 
    };
    const handleBorrowed = () => {
        const userId = Cookies.get('userId'); 
        if (userId) {
          navigate(`/borrowed?userId=${userId}`);
        } else {
          console.log('User ID is missing.');
        }
      };
      
      const handleLogout = async () => {
        try {
      
         navigate('http://localhost:3001/api/logout', {}, { withCredentials: true });
          Cookies.remove('userId');
          Cookies.remove('token')
          navigate('/');
        } catch (err) {
          console.error('Error during logout', err);
        }
      };

    const handleImageButtonClick = () => {
        navigate('/profile'); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSaveChanges = () => {
        setMessage("Your details have been updated.");
        
    };
    const handleSub = () => {  const userId = Cookies.get('userId'); 
        if (userId) {
          navigate(`/subscription?userId=${userId}`); 
        } else {
    
          console.log('User ID is missing.');
        }
      };
    const toggleSidebar = () => {
        setIsSidebarOpen(prevState => !prevState);
    };

    return (
        <div className={`homepage ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
            <div className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <h2>AML</h2>
                <button className="sidebar-button" onClick={() => handleNavigation("/home")}>Home</button>
                <button className="sidebar-button" onClick={() => handleNavigation("/borrowed")}>Borrowed</button>
                <button className="sidebar-button" onClick={() => handleNavigation("/subscription")}>Subscription</button>
                <button className="sidebar-button" onClick={() => handleNavigation("/settings")}>Settings</button>
            </div>
  
            <div className="main-content">
                <div className="navbar">
                    <button className="sidebar-toggle" onClick={toggleSidebar}>☰</button>
                    <h1>Profile</h1>
                    <div className="navbar-buttons">
                    <button className="image-button" onClick={handleImageButtonClick}>
                            <img src="/profile.png" alt="Profile" className="image-icon" />
                        </button>
                        <button className="logout-button" onClick={handleLogout}>Log Out</button>
                    </div>
                </div>

                <div className="content">
                    <h3>Update Profile Information</h3>
                    <p>Update your username or password below.</p>

                    <div className="form-group">
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your new username"
                        />
                    </div>
                
                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your new password"
                        />
                    </div>
                    <button className="save-button" onClick={handleSaveChanges}>Save Changes</button>

                    {message && <p className="profile-message">{message}</p>}
                </div>
            </div>
        </div>
       
    );
}

export default ProfilePage;
