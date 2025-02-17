import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './Authcontext';

export default function Navbar({ onViewDetails, handleLogout, onViewStudents, onViewComplaints }) {
    const { isAuthenticated, userData } = useAuth();

    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/">Home</Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li className="navbar-item">
                            {/* "View Details" button calls onViewDetails passed from Home */}
                            <button onClick={onViewDetails}>View Details</button>
                        </li>
                        {userData.role === 'admin' && (
                            <>
                                <li className="navbar-item">
                                    <button onClick={onViewStudents}>View All Students</button>
                                </li>
                                <li className="navbar-item">
                                    <button onClick={onViewComplaints}>View All Complaints</button>
                                </li>
                            </>
                        )}
                        <li className="navbar-item">
                            <button onClick={handleLogout}>Logout</button>
                        </li>
                        {userData.role === 'student' && (
                            <li className="navbar-item">
                                <Link to="/submit-complaint">Submit Complaint</Link>
                            </li>
                        )}
                    </>
                ) : (
                    <>
                        <li className="navbar-item">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/signup">Register</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}
