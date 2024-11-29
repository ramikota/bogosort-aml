import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PaymentHistory() {
    const navigate = useNavigate();
    const paymentInfo = [
        { amount: '£4.99', method: 'Direct Debit', date: '01/11/2024'},
        { amount: '£4.99', method: 'Direct Debit', date: '01/10/2024'},
        { amount: '£4.99', method: 'Direct Debit', date: '01/09/2024'},
        { amount: '£4.99', method: 'Direct Debit', date: '01/08/2024'},
        { amount: '£4.99', method: 'Direct Debit', date: '01/07/2024'}
    ]

    return (
        <div className="main">
            <h1>Payment History</h1>
            <table>
                <tr>
                    <th>Payment Amount</th>
                    <th>Payment Method</th>
                    <th>Payment Date</th>
                </tr>
                {paymentInfo.map((payment, index) => {
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