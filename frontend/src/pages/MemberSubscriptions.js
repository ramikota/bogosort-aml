import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentHistory from './PaymentHistory';
import "../styles/AccountantPage.css";
import * as XLSX from 'xlsx';

function MemberSubscriptions() {
    const [subscriptions, setSubscriptions] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:3001/api/getSubscription")
            .then(response => response.json())
            .then(data => {
                if (data > 0) {
                    setSubscriptions(data)
                } else {
                    setError("There is no payment history.");
                }
            }, []);
        })

    const handleNavigation = () => {
        navigate('/PaymentHistory');
    }

    const exportData = () => {
        const worksheet = XLSX.utils.json_to_sheet(subscriptions);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Members');
        XLSX.writeFile(workbook, 'Subscriptions.xlsx');
    };

    return (
        <div className="main">
            <h1>Member Subscriptions</h1>
            <table>
                <tr>
                    <th>Members</th>
                    <th>Subscription Amount</th>
                    <th>Payment History</th>
                </tr>
                {subscriptions.map((member, index) => {
                    return(
                    <tr key = {index}>
                        <td>{member.name}</td>
                        <td>{member.subscriptionAmount}</td>
                        <td><button className="view-button" onClick={handleNavigation}>View</button></td>
                    </tr>
                    )
                })}
            </table>
            <button className="export-button" onClick={exportData}>Export Finances</button>
        </div>
        );
}

export default MemberSubscriptions;