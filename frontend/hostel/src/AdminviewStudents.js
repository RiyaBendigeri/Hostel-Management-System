import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Ensure you have this CSS for styling

export default function AdminViewStudents() {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const token = sessionStorage.getItem('accessToken');
      try {
        const response = await axios.get('http://localhost:4000/students', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudents(response.data);
      } catch (err) {
        setError('Failed to fetch students');
      }
    };

    fetchStudents();
  }, []);

  return (
    <div>
    
      {error && <p>{error}</p>}
      {students.length > 0 ? (
        <table className="students-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Room Number</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.roomNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No students found.</p>
      )}
    </div>
  );
}
