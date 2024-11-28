import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

function BorrowedPage() {
  const [borrowedMedia, setBorrowedMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId'); // Assuming you're using userId from localStorage

    if (userId) {
      fetch(`http://localhost:3001/api/borrowed?userId=${userId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.borrowedItems) {
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

  const handleReturn = (mediaId) => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      fetch(`http://localhost:3001/api/return/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mediaId }),
      })
        .then(response => response.json())
        .then(() => {
          
          setBorrowedMedia(borrowedMedia.filter(item => item.id !== mediaId));
        })
        .catch(error => console.error("Error returning the media:", error));
    }
  };


  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  const handleProfileButtonClick = () => {
    navigate('/profile');
};

const handleSettingsButtonClick = () => {
    navigate('/settings');
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
        <button className="sidebar-button" onClick={() => handleNavigation("/home")}>
          Home
        </button>
        <button className="sidebar-button" onClick={handleSub}>Subscription</button>
        
      </div>

      <div className="main-content">
        <div className="navbar">
          <div className="navbar-buttons">
          <button className="image-button" onClick={handleProfileButtonClick}>
                            <img
                                src="/profile.png"
                                alt="Profile"
                                className="image-icon"
                            />
                        </button>
                        <button className="image-button" onClick={handleSettingsButtonClick}>
                            <img
                                src="/settings.png"
                                alt="Settings"
                                className="image-icon"
                            />
                        </button>
            <button className="logout-button" onClick={handleLogout}>
              Log Out
            </button>
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