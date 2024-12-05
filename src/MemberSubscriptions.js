import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PaymentHistory from './PaymentHistory';
import "./stylesheet.css";
import * as XLSX from 'xlsx';

function MemberSubscriptions() {
    const navigate = useNavigate();

    /*     const [subscriptions, setSubscriptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/api/getSubscriptions")
            .then(response => response.json())
            .then(data => {
                if (data > 0) {
                    setSubscriptions(data)
                } else {
                    setErrorMessage("There is no payment history.");
                }
    }, []); */

    const members = [
        { name: 'John', subscriptionAmount: '£4.99'},
        { name: 'James', subscriptionAmount: '£4.99'},
        { name: 'Joe', subscriptionAmount: '£4.99'},
        { name: 'Ben', subscriptionAmount: '£4.99'},
        { name: 'Bob', subscriptionAmount: '£4.99'}
    ]

    const handleNavigation = () => {
        navigate('/PaymentHistory');
    }

    const exportData = () => {
        const worksheet = XLSX.utils.json_to_sheet(members);
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
                {members.map((member, index) => {
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