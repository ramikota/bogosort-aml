import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

function SubscriptionPage() {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token');
    if (!token) {
      setError("No authentication token found.");
      setLoading(false);
      return;
    }

    fetch('http://localhost:3001/api/subscription', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then((data) => {
        if (data.subscription) {
          setSubscription(data.subscription);
        } else {
          setError("No subscription found.");
        }
      })
      .catch((err) => {
        setError("Error fetching subscription data.");
        console.error("Error fetching subscription data:", err);
      })
      .finally(() => setLoading(false));
  }, []);

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
    navigate("/profile");
  };

  const handleBorrowed = () => {
    const userId = Cookies.get('userId'); 
=======
  const handleProfileButtonClick = () => {
    navigate('/profile');
};

const handleSettingsButtonClick = () => {
    navigate('/settings');
};
  const handleBorrowed = () => { const userId = localStorage.getItem('userId'); 

    if (userId) {
      navigate(`/borrowed?userId=${userId}`);
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

        <button className="sidebar-button" onClick={handleBorrowed}>Borrowed</button>
        <button className="sidebar-button" onClick={() => handleNavigation("/settings")}>
          Settings
        </button>
=======
                <button className="sidebar-button" onClick={handleBorrowed}>Borrowed</button>                
                

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
          <h2>Subscription Details</h2>
          {loading && <p>Loading...</p>}
          {error && <p className="error-message">{error}</p>}

          {subscription && (
            <table id="borrowed-media-table">
              <thead>
                <tr>
                  <th>Subscription ID</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{subscription.id}</td>
                  <td>{new Date(subscription.start_date).toLocaleDateString()}</td>
                  <td>{new Date(subscription.end_date).toLocaleDateString()}</td>
                  <td>{subscription.active ? "Active" : "Inactive"}</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default SubscriptionPage;