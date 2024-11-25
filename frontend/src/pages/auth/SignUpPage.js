import React, { useState } from "react";
import axios from "axios";
import "../../styles/Auth.css";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        address: "",
        postcode: "",
        city: "",
        country: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // For redirecting after successful signup

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send a POST request to the backend to register the user
            const response = await axios.post("http://localhost:3001/api/register", formData);
            setMessage("Signup successful! Please log in.");
            setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
        } catch (error) {
            setMessage("Signup failed: " + error.response.data.message);
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
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
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
                
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                
                <input
                    type="text"
                    name="postcode"
                    placeholder="Postcode"
                    value={formData.postcode}
                    onChange={handleChange}
                    required
                />
                
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />
                
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                />
                
                <button type="submit">Sign Up</button>
                {message && <p className="auth-message">{message}</p>}
            </form>
        </div>
    );
}

export default SignUpPage;