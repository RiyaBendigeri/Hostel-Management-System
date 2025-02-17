import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Ensure you have this CSS for styling

export default function AdminViewComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = sessionStorage.getItem('accessToken');
      try {
        const response = await axios.get('http://localhost:4000/complaints', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setComplaints(response.data);
      } catch (err) {
        setError('Failed to fetch complaints');
      }
    };

    fetchComplaints();
  }, []);

  const handleStatusUpdate = async (id) => {
    const token = sessionStorage.getItem('accessToken');
    try {
      await axios.put(`http://localhost:4000/complaints/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints(complaints.map(complaint => 
        complaint.id === id ? { ...complaint, status: 'seen' } : complaint
      ));
    } catch (err) {
      setError('Failed to update status');
    }
  };

  return (
    <div>
      <h2>All Complaints:</h2>
      {error && <p>{error}</p>}
      <table className="complaints-table">
        <thead>
          <tr>
            <th>Complaint Text</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map(complaint => (
            <tr key={complaint.id}>
              <td>{complaint.complaintText}</td>
              <td>{complaint.status}</td>
              <td>
                {complaint.status !== 'seen' && (
                  <button onClick={() => handleStatusUpdate(complaint.id)}>
                    Mark as Seen
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
