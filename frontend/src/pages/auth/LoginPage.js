import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import "../../styles/Auth.css";

function LoginPage() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(''); 
    try {
        const response = await axios.post( 
            'http://localhost:3001/api/login', 
            formData, 
            { withCredentials: true }
        );

        const { token, userId } = response.data;

        Cookies.set('token', token, { expires: 1 });
        Cookies.set('userId', userId, { expires: 1 });

        navigate('/home');
    } catch (err) {
        setError(err.response?.data?.message || 'An error occurred');
    } finally {
        setLoading(false);
    }
};

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
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
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Log In'}
                </button>
                <Link to="/accountantlogin">Accountant login</Link>
                {error && <div className="error-message">{error}</div>}
            </form>
        </div>
    );
}

export default LoginPage;