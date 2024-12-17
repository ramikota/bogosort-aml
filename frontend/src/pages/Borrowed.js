import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 

function BorrowedPage() {
  const [borrowedMedia, setBorrowedMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

useEffect(() => {
    const userId = Cookies.get('userId');
    if (userId) {
      fetch(`http://localhost:3001/api/borrowed?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${Cookies.get('token')}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
  
          if (data.borrowedItems && data.borrowedItems.length > 0) {
            setBorrowedMedia(data.borrowedItems);
          } else {
            setError("No borrowed media found.");
          }
        })
        .catch((err) => {
          setError("Error fetching borrowed media.");
          console.error("Error fetching borrowed media:", err);
        })
        .finally(() => setLoading(false));
    } else {
      setError("User ID is missing.");
      setLoading(false);
    }
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

  const handleReturn = (mediaId) => {
    const userId = Cookies.get('userId'); 

    if (userId) {
      fetch(`http://localhost:3001/api/return/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('token')}`, 
        },
        body: JSON.stringify({ mediaId }),
      })
        .then(response => response.json())
        .then(() => {
          setBorrowedMedia(prevMedia => prevMedia.filter(item => item.id !== mediaId));
        })
        .catch(error => console.error("Error returning the media:", error));
    }
  };

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
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleSub = () => {
    const userId = Cookies.get('userId');
    if (userId) {
      navigate(`/subscription?userId=${userId}`);
    } else {
      console.log('User ID is missing.');
    }
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
                <h1>Borrowed</h1>
                <div className="navbar-buttons">
                <button className="image-button" onClick={handleImageButtonClick}>
                            <img src="/profile.png" alt="Profile" className="image-icon" />
                        </button>
                    <button className="logout-button" onClick={handleLogout}>Log Out</button>
                </div>
            </div>
        <div className="content">
          <h2>Borrowed Media</h2>

          <table id="borrowed-media-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Borrowed On</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {borrowedMedia.length > 0 ? (
                borrowedMedia.map((media) => (
                  <tr key={media.id}>
                    <td>{media.title}</td>
                    <td>{media.type}</td>
                    <td>{new Date(media.borrow_date).toLocaleDateString()}</td>
                    <td>
                      <button 
                        onClick={() => handleReturn(media.id)} 
                        className="return-button"
                      >
                        Return
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No borrowed media found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BorrowedPage;