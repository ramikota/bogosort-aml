import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "../styles/HomePage.css";

function MediaDetails() {
  const { id } = useParams(); // Get the media ID from the URL
  const [mediaDetails, setMediaDetails] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/api/media/${id}`)
      .then(response => response.json())
      .then(data => {
        setMediaDetails(data.mediaDetails);
        setAvailability(data.availability);
        setIsLoading(false); // Set loading to false after data is fetched
      })
      .catch(err => {
        console.error("Error fetching media details:", err);
        setIsLoading(false); // Ensure loading is stopped even on error
      });
  }, [id]);

  const handleBorrow = (branchId) => {
    fetch("http://localhost:3001/api/borrow", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mediaId: mediaDetails.id, branchId })
    })
      .then(response => response.json())
      .then(data => alert(data.message))
      .catch(err => console.error("Error borrowing media:", err));
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
    return (
      <div className="loading-spinner">Loading...</div> // Spinner when loading
    );
  }

  return (
    <div className="homepage">
      <div className="sidebar">
        <h2>AML</h2>
        <button 
          className="sidebar-button"
          onClick={() => handleNavigation("/home")}
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
          <div className="navbar-buttons" style={{ display: 'flex', justifyContent: 'flex-start', gap: '15px' }}>
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

        <div className="content">
          <h2>{mediaDetails.title}</h2>
          <img
            src={mediaDetails.image}
            alt={mediaDetails.title}
            className="media-image"
          />
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
                    <button 
                      className="sidebar-button"
                      onClick={() => handleBorrow(branch.branch_id)}
                    >
                      Borrow
                    </button>
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