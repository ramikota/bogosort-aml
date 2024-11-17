import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Auth.css";


function LoginPage() {
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("/api/auth/login", formData);
            localStorage.setItem("token", response.data.token); // saves token for authenticated requests
            navigate("/profile");
        } catch (error) {
            setMessage("Login failed: " + error.response.data.message);
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
