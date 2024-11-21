import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import OpeningPage from "./pages/OpeningPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import MediaDetails from './pages/MediaDetails';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<OpeningPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/media/:id" element={<MediaDetails />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<h1>404: Page Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
