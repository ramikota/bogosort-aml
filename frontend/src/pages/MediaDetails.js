import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/HomePage.css";

function MediaDetails() {
  const { id } = useParams();
  const [mediaDetails, setMediaDetails] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');  // success or error message type
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/media/${id}`)
      .then(response => response.json())
      .then(data => {
        setMediaDetails(data.mediaDetails);
        setAvailability(data.availability);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching media details:", err);
        setIsLoading(false);
      });
  }, [id]);

  const handleBorrow = (branchId) => {
    const userId = localStorage.getItem('userId'); 
  
    if (!userId) {
      setMessage('User ID is missing. Please log in again.');
      setMessageType('error');
      return; 
    }
    

    fetch("http://localhost:3001/api/borrow", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ mediaId: mediaDetails.id, branchId, userId }),
    })
    .then(response => response.json())
    .then(data => {
      setMessage(data.message);
      setMessageType('success');
      setTimeout(() => setMessage(''), 2000); // Hide message after 2 seconds
    })
    .catch(err => {
      setMessage('Error borrowing media.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 2000); // Hide message after 2 seconds
    });
  };
  const handleBorrowed = () => { const userId = localStorage.getItem('userId'); 
    if (userId) {
      navigate(`/borrowed?userId=${userId}`); 
    } else {

      console.log('User ID is missing.');
    }
  };
  const handleSub = () => { const userId = localStorage.getItem('userId'); 
    if (userId) {
      navigate(`/subscription?userId=${userId}`); 
    } else {

      console.log('User ID is missing.');
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleImageButtonClick = () => {
    navigate('/profile');
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

      </div>

      <div className="main-content">
        <div className="navbar">
          <div className="navbar-buttons" style={{ display: 'flex', justifyContent: 'flex-start', gap: '15px' }}>
            <button className="image-button" onClick={handleImageButtonClick}>
              <img src="/profile.png" alt="Profile" className="image-icon" />
            </button>
            <button className="logout-button" onClick={handleLogout}>Log Out</button>
          </div>
        </div>

        <div className="content">
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

          {message && (
            <div className={messageType === 'error' ? 'error-message' : 'success-message'}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  }

export default MediaDetails;