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
  const [deliveryOption, setDeliveryOption] = useState('pickUp');
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
    address: '',
    postcode: '',
    city: '',
    phone: '',
  });
  const [deliveryDate, setDeliveryDate] = useState('');
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


    if (deliveryOption === 'delivery' && !userDetails.firstName) {
      setMessage('Please complete the delivery form.');
      setMessageType('error');
      setTimeout(() => {
        setMessage(''); 
      }, 2000);
      return;
    }

    fetch("http://localhost:3001/api/borrow", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, 
      },
      body: JSON.stringify({ 
        mediaId: mediaDetails.id, 
        branchId, 
        userId, 
      }),
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

   
        if (deliveryOption === 'delivery') {
          const estimatedDate = new Date();
          estimatedDate.setDate(estimatedDate.getDate() + 3);
          setDeliveryDate(estimatedDate.toDateString());
          alert(`Your item will be delivered to: ${userDetails.address}. Expected delivery date: ${estimatedDate.toDateString()}`);
        }

      
        setTimeout(() => {
          setMessage('');
        }, 2000);
      })
      .catch(err => {
        setMessage(`Error: ${err.message}`);
        setMessageType('error');
        setTimeout(() => setMessage(''), 2000); 
      });
  };

  const handleDeliveryAddressChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value
    });
  };

  const handleDeliveryOptionChange = (e) => {
    setDeliveryOption(e.target.value);
    setShowDeliveryForm(e.target.value === 'delivery');
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/logout', { method: 'POST' });
      Cookies.remove('userId');
      Cookies.remove('token');
      navigate('/');
    } catch (err) {
      console.error('Error during logout', err);
    }
  };

  if (isLoading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  return (
    <div className="homepage">
      <div className="sidebar">
        <h2>AML</h2>
        <button className="sidebar-button" onClick={() => navigate("/home")}>Home</button>
        <button className="sidebar-button" onClick={() => navigate("/borrowed")}>Borrowed</button>
        <button className="sidebar-button" onClick={() => navigate("/subscription")}>Subscription</button>
        <button className="sidebar-button" onClick={() => navigate("/settings")}>Settings</button>
      </div>

      <div className="main-content">
        <div className="navbar">
          <button className="logout-button" onClick={handleLogout}>Log Out</button>
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

          <h3>Borrow Option</h3>
          <div className="borrow-options">
            <label>
              <input
                type="radio"
                name="deliveryOption"
                value="pickUp"
                checked={deliveryOption === 'pickUp'}
                onChange={handleDeliveryOptionChange}
              /> Pick-Up
            </label>
            <label>
              <input
                type="radio"
                name="deliveryOption"
                value="delivery"
                checked={deliveryOption === 'delivery'}
                onChange={handleDeliveryOptionChange}
              /> Delivery
            </label>
          </div>

          {showDeliveryForm && (
            <div className="delivery-form">
              <h4>Delivery Details</h4>
              <form className="form-vertical">
                <input
                  type="text"
                  name="firstName"
                  value={userDetails.firstName}
                  placeholder="First Name"
                  onChange={handleDeliveryAddressChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="lastName"
                  value={userDetails.lastName}
                  placeholder="Last Name"
                  onChange={handleDeliveryAddressChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="address"
                  value={userDetails.address}
                  placeholder="Address"
                  onChange={handleDeliveryAddressChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="postcode"
                  value={userDetails.postcode}
                  placeholder="Postcode"
                  onChange={handleDeliveryAddressChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="city"
                  value={userDetails.city}
                  placeholder="City"
                  onChange={handleDeliveryAddressChange}
                  className="form-input"
                />
                <input
                  type="text"
                  name="phone"
                  value={userDetails.phone}
                  placeholder="Phone"
                  onChange={handleDeliveryAddressChange}
                  className="form-input"
                />
              </form>
            </div>
          )}

          <h3>Availability:</h3>
          <div className="media-grid">
            {availability.length > 0 ? (
              availability.map((branch) => (
                <div key={branch.branch_name} className="media-item">
                  <p>{branch.branch_name}: {branch.available_count > 0 ? branch.available_count : 'Not Available'}</p>
                  {branch.available_count > 0 && (
                    <button className="borrow-button" onClick={() => handleBorrow(branch.branch_id)}>Borrow</button>
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