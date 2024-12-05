import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
import AccountantLogin from "./pages/auth/AccountantLogin";
import SignUpPage from "./pages/auth/SignUpPage";
import OpeningPage from "./pages/OpeningPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import MediaDetails from './pages/MediaDetails';
import Borrowed from './pages/Borrowed';
import Sub from './pages/Subscription';

import SubscriptionSignUpPage from "./pages/auth/SubscriptionSignUp";
import SubscribedPage from "./pages/SubscribedPage";
import SubscriptionPage from "./pages/SubscriptionPage";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<OpeningPage />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/accountantlogin" element={<AccountantLogin />} />
                <Route path="/media/:id" element={<MediaDetails />} />
                <Route path="/signup" element={<SignUpPage />} />

                <Route path="/borrowed" element={<Borrowed />} />

                <Route path="/subscriptionsignup" element={<SubscriptionSignUpPage />} />
                <Route path="/subscribed" element={<SubscribedPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/subscription" element={<Sub />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="*" element={<h1>404: Page Not Found</h1>} />
            </Routes>
        </Router>
    );
}

export default App;
