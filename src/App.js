import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberSubscriptions from "./MemberSubscriptions";
import PaymentHistory from "./PaymentHistory";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MemberSubscriptions />} />
                <Route path="/PaymentHistory" element={<PaymentHistory />} />
            </Routes>
        </Router>
    )
}

export default App;