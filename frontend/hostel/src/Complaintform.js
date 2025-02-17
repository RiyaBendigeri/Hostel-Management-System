import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar
export default function ComplaintForm() {
  const [complaintText, setComplaintText] = useState('');
  const [submittedComplaint, setSubmittedComplaint] = useState(null); // New state to track submitted complaint
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { complaintText };

    try {
      const token = sessionStorage.getItem('accessToken');
      const response = await axios.post('http://localhost:4000/complaints', 
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          }
        }
      );

      // Set the submitted complaint state to show it
      setSubmittedComplaint(complaintText);

      // Clear the input box after successful submission
      setComplaintText('');

      console.log('Complaint submitted:', response.data);
    } catch (err) {
      console.error('Error submitting complaint:', err.response?.data || err.message);
      setError('Failed to submit complaint');
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <h1>Submit a Complaint</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={complaintText}
          onChange={(e) => setComplaintText(e.target.value)}
          placeholder="Describe your complaint"
          required
        />
        <button type="submit">Submit Complaint</button>
      </form>

      {/* Show error message if there was an error */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Display the submitted complaint */}
      {submittedComplaint && (
        <p style={{ color: 'green' }}>Complaint Submitted: {submittedComplaint}</p>
      )}
    </div>
  );
}
