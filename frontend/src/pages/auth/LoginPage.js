import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import "../../styles/Auth.css";

function LoginPage() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3001/api/login', formData);  // Correct URL
            localStorage.setItem('token', response.data.token);  // Save token for authentication
            setMessage('Login successful!');
            navigate('/home'); // Redirect to home page
        } catch (error) {
            setMessage(error.response?.data?.message || 'Invalid username or password.');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="username"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Log In</button>
                {message && <p className="auth-message">{message}</p>}
            </form>
        </div>
    );
}

export default LoginPage;