import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentHistory() {
    const navigate = useNavigate();

    const [payments, setPayments] = useState([]);
    const [error, setError]= useState("");

    useEffect(() => {
        fetch("http://localhost:3001/api/getSubscription")
            .then(response => response.json())
            .then(data => {
                if (data > 0) {
                    setPayments(data)
                } else {
                    setErrorMessage("There is no member history.");
                }
            }, []);
        })

    return (
        <div className="main">
            <h1>Payment History</h1>
            <table>
                <tr>
                    <th>Payment Amount</th>
                    <th>Payment Method</th>
                    <th>Payment Date</th>
                </tr>
                {payments.map((payment, index) => {
                    return(
                    <tr key = {index}>
                        <td>{payment.amount}</td>
                        <td>{payment.method}</td>
                        <td>{payment.date}</td>
                    </tr>
                    )
                })}
            </table>
            <button className="back-button" onClick={() => navigate(-1)}>Back</button> 
        </div>
    );
}

export default PaymentHistory;