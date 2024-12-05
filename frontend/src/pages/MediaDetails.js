import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'; 
import "../styles/HomePage.css";

function MediaDetails() {
  const { id } = useParams();
  const [mediaDetails, setMediaDetails] = useState({});
  const [availability, setAvailability] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');  
    
    if (!token) {
      setMessage('Authorization token is missing. Please log in again.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }
  
    fetch(`http://localhost:3001/api/media/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch media details');
        }
        return response.json();
      })
      .then(data => {
        setMediaDetails(data.mediaDetails);
        setAvailability(data.availability);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching media details:", err);
        setMessage('Error fetching media details.');
        setMessageType('error');
        setIsLoading(false);
      });
  }, [id]);

  const handleBorrow = (branchId) => {
    const userId = Cookies.get('userId'); 
    const token = Cookies.get('token'); 
    
    if (!userId) {
      setMessage('User ID is missing. Please log in again.');
      setMessageType('error');
      return;
    }
  
    if (!token) {
      setMessage('Authorization token is missing. Please log in again.');
      setMessageType('error');
      return;
    }
  
    fetch("http://localhost:3001/api/borrow", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({ mediaId: mediaDetails.id, branchId, userId }),
    })
      .then(response => {
        if (!response.ok) {
  
          return response.json().then(data => {
            throw new Error(data.message || 'Failed to borrow media');
          });
        }
        return response.json();
      })
      .then(data => {
        setMessage(data.message || 'Item borrowed successfully');
        setMessageType('success');
        setTimeout(() => setMessage(''), 2000);
      })
      .catch(err => {
        setMessage(`Error: ${err.message}`);
        setMessageType('error');
        setTimeout(() => setMessage(''), 2000); 
      });
  };
  const handleBorrowed = () => {
    const userId = Cookies.get('userId'); 
    if (userId) {
      navigate(`/borrowed?userId=${userId}`);
    } else {
      setMessage('User ID is missing.');
      setMessageType('error');
    }
  };

  const handleSub = () => {
    const userId = Cookies.get('userId');  
    if (userId) {
      navigate(`/subscription?userId=${userId}`);
    } else {
      setMessage('User ID is missing.');
      setMessageType('error');
    }
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

  const handleProfileButtonClick = () => {
    navigate('/profile');
};

const handleSettingsButtonClick = () => {
    navigate('/settings');
};

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="homepage">
      <div className="sidebar">
        <h2>AML</h2>
        <button className="sidebar-button" onClick={() => handleNavigation("/home")}>Home</button>
        <button className="sidebar-button" onClick={handleBorrowed}>Borrowed</button>
        <button className="sidebar-button" onClick={handleSub}>Subscription</button>

        <button className="sidebar-button" onClick={() => handleNavigation("/settings")}>Settings</button>
=======
        

      </div>

      <div className="main-content">
        <div className="navbar">
          <div className="navbar-buttons" style={{ display: 'flex', justifyContent: 'flex-start', gap: '15px' }}>
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
            <button className="logout-button" onClick={handleLogout}>Log Out</button>
          </div>
        </div>

        <div className="content">
          {message && (
            <div className={messageType === 'error' ? 'error-message' : 'success-message'}>
              {message}
            </div>
          )}
          <h2>{mediaDetails.title}</h2>
          <img src={mediaDetails.image} alt={mediaDetails.title} className="media-image" />
          <p><strong>Title:</strong> {mediaDetails.title}</p>
          <p><strong>Author:</strong> {mediaDetails.author}</p>
          <p><strong>Type:</strong> {mediaDetails.type}</p>

          <h3>Availability:</h3>
          <div className="media-grid">
            {availability.length > 0 ? (
              availability.map((branch) => (
                <div key={branch.branch_name} className="media-item">
                  <p>{branch.branch_name}: {branch.available_count > 0 ? branch.available_count : 'Not Available'}</p>
                  {branch.available_count > 0 && (
                    <button className="sidebar-button" onClick={() => handleBorrow(branch.branch_id)}>Borrow</button>
                  )}
                </div>
              ))
            ) : (
              <p>Not Available at the moment</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  }

export default MediaDetails;