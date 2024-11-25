import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../../styles/Auth.css";

function SubscriptionSignUpPage() {
    const navigate = useNavigate();
    const location = useLocation();

    // Access the signup form data from state
    const { formData } = location.state || {};

    const [selectedPlan, setSelectedPlan] = useState("");
    const [showPaymentForm, setShowPaymentForm] = useState(false);

    const [paymentData, setPaymentData] = useState({
        address: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
    });

    const handlePlanSelect = (plan) => {
        setSelectedPlan(plan);
        setShowPaymentForm(true); // Show the payment form
    };

    const handlePaymentChange = (e) => {
        const { name, value } = e.target;
        setPaymentData({ ...paymentData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedPlan) {
            alert("Please select a subscription plan.");
            return;
        }

        const { address } = paymentData;

        if (!address) {
            alert("Please complete the payment form.");
            return;
        }


        const signupData = {
            ...formData,
            subscriptionPlan: selectedPlan,
            billingAddress: address,
        };
        console.log("Final signup data:", signupData);

        alert("Signup and subscription completed!");

        navigate("/subscribed");
    };

    return (
        <div className="subscription-container">
            <h2>Select a Subscription Plan</h2>
            <div className="subscription-options">
                <button
                    className={selectedPlan === "subscribtion" ? "selected" : ""}
                    onClick={() => handlePlanSelect("subscription")}
                >
                    AML Membership - £4.99/year
                </button>
            </div>

            {showPaymentForm && (
                <div className="payment-form-container">
                    <h3>Payment Information</h3>
                    <form onSubmit={handleSubmit} className="payment-form">
                        <h4>Billing Address</h4>
                        <input
                            type="text"
                            name="address1"
                            placeholder="Address Line 1"
                            value={paymentData.address1}
                            onChange={handlePaymentChange}
                            required
                        />

                        <input
                            type="text"
                            name="address2"
                            placeholder="Address Line 2"
                            value={paymentData.address2}
                            onChange={handlePaymentChange}
                            required
                        />

                        <input
                            type="text"
                            name="postcode"
                            placeholder="Postcode"
                            value={paymentData.postcode}
                            onChange={handlePaymentChange}
                            required
                        />

                        <h4>Card Details</h4>
                        <input
                            type="text"
                            name="cardNumber"
                            placeholder="Card Number"
                            value={paymentData.cardNumber}
                            onChange={handlePaymentChange}
                            required
                        />
                        <input
                            type="text"
                            name="expiryDate"
                            placeholder="Expiry Date (MM/YY)"
                            value={paymentData.expiryDate}
                            onChange={handlePaymentChange}
                            required
                        />
                        <input
                            type="text"
                            name="cvc"
                            placeholder="CVC"
                            value={paymentData.cvc}
                            onChange={handlePaymentChange}
                            required
                        />
                        <button type="submit" className="save-changes-button">
                            Pay & Continue
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default SubscriptionSignUpPage;
