import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function ViewComplaints() {  
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = sessionStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:4000/complaints', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setComplaints(response.data);
    };

    fetchComplaints();
  }, []);

  return (
    <div>
      <h1>Your Complaints</h1>
      {complaints.map(complaint => (
        <div key={complaint.id}>
          <p>{complaint.complaintText}</p>
          <p>Status: {complaint.status}</p>
        </div>
      ))}
    </div>
  );
}
