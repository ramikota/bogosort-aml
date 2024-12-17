import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/HomePage.css"; 
import Cookies from 'js-cookie'; 

function SettingsPage() {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); 
    const [textSize, setTextSize] = useState(() => {
      return localStorage.getItem('textSize') || 'medium';
    });
    const handleTextSizeChange = (size) => {
      setTextSize(size);
      localStorage.setItem('textSize', size); 
      document.documentElement.style.fontSize = getFontSize(size); 
    };
    const getFontSize = (size) => {
      switch (size) {
        case 'default': return '16px';
        case 'small': return '13px';
        case 'medium': return '16px';
        case 'large': return '19px';
        default: return '16px';
      }
    };
    useEffect(() => {
      document.documentElement.style.fontSize = getFontSize(textSize);
    }, [textSize]);

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
    
    const handleNavigation = (path) => {
        navigate(path); 
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
    const handleBorrowed = () => {
        const userId = Cookies.get('userId'); 
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
                  <h1>Settings</h1>
          
                  <div className="navbar-buttons">
                  <button className="image-button" onClick={handleImageButtonClick}>
                            <img src="/profile.png" alt="Profile" className="image-icon" />
                        </button>
                      <button className="logout-button" onClick={handleLogout}>Log Out</button>
                  </div>
              </div>

                <div className="content">
                    <h3>Manage Settings</h3>
                    <label>Choose Text Size:</label>
      <select value={textSize} onChange={(e) => handleTextSizeChange(e.target.value)}>
      <option value="default">Default</option>
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
      </select>
                

                    
                </div>
            </div>
        </div>
        
    );
}

export default SettingsPage;
