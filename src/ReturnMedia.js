import React, { useState, useEffect } from 'react';

function ReturnMedia() {
/*     const [borrowed, setBorrowed] = useState([]);
    const [errorgMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/api/getBorrowedMedia")
            .then(response => response.json())
            .then(data => {
                if (data > 0) {
                    setBorrowed(data)
                }
                else {
                    setErrorMessage("You have not borrowed any media.");
                }
    }, []); */
    
    const mediaItems = [
        { book: 'img', dateBorrowed: '01/11/2024', returnBy: '10/11/2024' },
        { book: 'img', dateBorrowed: '01/11/2024', returnBy: '10/11/2024' },
        { book: 'img', dateBorrowed: '01/11/2024', returnBy: '10/11/2024' },
        { book: 'img', dateBorrowed: '01/11/2024', returnBy: '10/11/2024' },
        { book: 'img', dateBorrowed: '01/11/2024', returnBy: '10/11/2024' }
    ];

    return (
        <div className="main">
            <table>
                <tr>
                    <th>Book</th>
                    <th>Date Borrowed</th>
                    <th>Return By</th>
                </tr>
                {mediaItems.map((item, index) => {
                    return(
                    <tr key = {index}>
                        <td>{item.book}</td>
                        <td>{item.dateBorrowed}</td>
                        <td>{item.returnBy}</td>
                    </tr>
                    )
                })}
            </table>
            <button className="submit-button" onClick="">
                Return Book(s)
            </button>
        </div>
    );
}

export default ReturnMedia;