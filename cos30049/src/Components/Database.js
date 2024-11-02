import React, { useState, useEffect } from 'react';


function Database() {
    // State variables to manage data, loading state, and errors
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // useEffect hook to fetch data when component mounts
    useEffect(() => {
        fetchData();
    }, []);

    // Function to fetch data from the backend
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8000/database');
            if (!response.ok) {
                throw new Error('Failed to fetch database data');
            }
            const result = await response.json();
            setData(result);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    // Render loading message while data is being fetched
    if (loading) {
        return <div>Loading...</div>;
    }

    // Render error message if there is an error
    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    // Render the database information
    return (
        <div className="database-container">
            <h2>Database Information</h2>
            {data && (
                <>
                    <div className="info-box">
                        {data.message}<br />
                        Total Users: {data.user_count}
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
}

export default Database;