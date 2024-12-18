import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/auth/LoginPage";
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
import ProtectedRoute from './components/ProtectedRoute.js';  
import MemberSubscriptions from "./pages/MemberSubscriptions.js";
import PaymentHistory from "./pages/PaymentHistory.js";

import MemberSubscriptions from "./pages/MemberSubscriptions.js";
import PaymentHistory from "./pages/PaymentHistory.js";



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<OpeningPage />} />
                <Route
                    path="/home" element={<ProtectedRoute element={<HomePage />} />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/media/:id" element={<ProtectedRoute element={<MediaDetails />} />} />
                <Route path="/signup" element={<SignUpPage />} />

                <Route path="/borrowed" element={<ProtectedRoute  element={<Borrowed />} />} />

                <Route path="/subscriptionsignup" element={<SubscriptionSignUpPage />} />
                <Route path="/subscribed"  element={<SubscribedPage />} />
                <Route path="/profile" element={<ProtectedRoute  element={<ProfilePage />} />}/>
                <Route path="/subscription" element={<ProtectedRoute  element={<Sub />} />} />
                <Route path="/settings" element={<ProtectedRoute element={<SettingsPage />} />}/>
                <Route path="/subscription" element={<SubscriptionPage />} />
                <Route path="*" element={<h1>404: Page Not Found</h1>} />

                <Route path="/membersubscriptions" element={<MemberSubscriptions />} />
                <Route path="/paymenthistory" element={<PaymentHistory />} />
            </Routes>
        </Router>
    );
}

export default App;
