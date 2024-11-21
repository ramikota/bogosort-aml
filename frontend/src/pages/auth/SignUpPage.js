import React, { useState } from "react";
import axios from "axios";
import "../../styles/Auth.css";
import { useNavigate } from "react-router-dom";

function SignUpPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3001/api/register", formData);
            setMessage(
                <>
                   <span style={{ color: 'green' }}>
                    Signup successful! Please <a href="/login">log in</a>.
                 </span>
                </>
            );
        } catch (error) {
            setMessage("Signup failed: " + error.response.data.message);
        }

        navigate("/subscriptionsignup", { state: { formData } });

    };

    return (
        <div className="auth-container">
            
            <form onSubmit={handleSubmit} className="auth-form">
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.Username}
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
                    value={formData.Country}
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
