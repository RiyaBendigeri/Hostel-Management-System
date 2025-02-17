/*import React, { useState } from 'react';
import { useAuth } from './Authcontext';
import axios from 'axios';
import ComplaintForm from './Complaintform'; // Import ComplaintForm
import AdminViewStudents from './AdminviewStudents'; // Import Admin View Students
import AdminViewComplaints from './Adminview'; // Import AdminViewComplaints
import Navbar from './Navbar'; // Import Navbar
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingUser } from '@fortawesome/free-solid-svg-icons';

export default function Home() {
    const { isAuthenticated, userData, logout } = useAuth();
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showStudents, setShowStudents] = useState(false); // State for showing students
    const [showComplaints, setShowComplaints] = useState(false); // State for showing complaints
    const [showComplaintForm, setShowComplaintForm] = useState(false); // State to show ComplaintForm

    // Fetch User Details (Admin or Student)
    const handleViewDetails = async () => {
        const storedToken = sessionStorage.getItem('accessToken');

        if (!isAuthenticated || !storedToken) {
            setError('You must be logged in to view details.');
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await axios.get("http://localhost:4000/details", {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            setUserDetails(response.data);
        } catch (error) {
            setError('Failed to fetch user details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle Logout
    const handleLogout = () => {
        logout(); // Call the logout function
        setUserDetails(null); // Clear user details on logout
        window.location.reload(); // Force a page reload to update the UI
    };

    // Handle viewing all students
    const handleViewStudents = () => {
        setShowStudents(true);
        setShowComplaints(false);
        setShowComplaintForm(false);
    };

    // Handle viewing all complaints
    const handleViewComplaints = () => {
        setShowComplaints(true);
        setShowStudents(false);
        setShowComplaintForm(false);
    };

    // Handle displaying ComplaintForm
    const handleRegisterComplaint = () => {
        setShowComplaintForm(true); // Set this to true to display ComplaintForm
        setShowStudents(false);
        setShowComplaints(false);
    };

    return (
        <div>
            <Navbar 
                onViewDetails={handleViewDetails} 
                handleLogout={handleLogout} 
                onViewStudents={handleViewStudents} 
                onViewComplaints={handleViewComplaints}
            />

            <div className="home-container">
                <video autoPlay loop muted playsInline className="background-video">
                    <source src="/Wind.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
                <div>
                    <div>
                        <FontAwesomeIcon icon={faBuildingUser} size="3x" style={{ color: 'white' }} />
                    </div>
                    <div className='newtitle'>
                        <h1>Hostel Management System</h1>
                    </div>
                    <div className='newhome'>
                        <button className="home-nav-button">
                            <Link to="/" className="nav-link">Home</Link>
                        </button>

                        {!isAuthenticated ? (
                            <>
                                <button className="home-nav-button">
                                    <Link to="/login" className="nav-link">Login</Link>
                                </button>
                                <button className="home-nav-button">
                                    <Link to="/signup" className="nav-link">Signup</Link>
                                </button>
                            </>
                        ) : (
                            <>
                                <button className="home-nav-button" onClick={handleLogout}>
                                    Logout
                                </button>
                                <button className="home-nav-button" >
                                    <Link to="/view-complaints" className="nav-link">complaints</Link>
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <footer className="home-footer">
                    <div className="footer-container">
                        <h2>Connect with Us</h2>
                        <div className="home-social-media">
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </div>
                        <p style={{ fontSize: 'larger', fontWeight: 'bolder' }}>
                            &copy; 2024 Hostel Management System. All Rights Reserved.
                        </p>
                        <p className="footer-quote">“Your home away from home.”</p>
                    </div>
                </footer>
            </div>

           
            {showComplaintForm && <ComplaintForm />}

           
            {userDetails && (
                <div className="user-details mt-4">
                    <h3>Your Details:</h3>
                    {userDetails.role === 'admin' ? (
                        <p><strong>Admin Username:</strong> {userDetails.username}</p>
                    ) : (
                        <>
                            <p><strong>Name:</strong> {userDetails.username}</p>
                            <p><strong>Surname:</strong> {userDetails.surname}</p>
                            <p><strong>College:</strong> {userDetails.college}</p>
                            <p><strong>Grad Year:</strong> {userDetails.currentYearOfGraduation}</p>
                            <p><strong>Room Number:</strong> {userDetails.roomNumber}</p>
                            <p><strong>Joined Date:</strong> {new Date(userDetails.createdAt).toLocaleDateString()}</p>
                        </>
                    )}
                </div>
            )}

           
            {error && <p>{error}</p>}

           
            {showStudents && (
                <div>
                    <h2>All Students:</h2>
                    <AdminViewStudents />
                </div>
            )}

            {showComplaints && (
                <div>
                    <h2>All Complaints:</h2>
                    <AdminViewComplaints />
                </div>
            )}
        </div>
    );
}
*/import React, { useState } from 'react';
import { useAuth } from './Authcontext';
import axios from 'axios';
import ComplaintForm from './Complaintform'; // Import ComplaintForm
import AdminViewStudents from './AdminviewStudents'; // Import Admin View Students
import AdminViewComplaints from './Adminview'; // Import AdminViewComplaints
import Navbar from './Navbar'; // Import Navbar

export default function Home() {
    const { isAuthenticated, userData, logout } = useAuth();
    const [error, setError] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showStudents, setShowStudents] = useState(false); // State for showing students
    const [showComplaints, setShowComplaints] = useState(false); // State for showing complaints

    // Fetch User Details (Admin or Student)
    const handleViewDetails = async () => {
        const storedToken = sessionStorage.getItem('accessToken');

        if (!isAuthenticated || !storedToken) {
            setError('You must be logged in to view details.');
            return;
        }

        setError(null);
        setLoading(true);

        try {
            const response = await axios.get("http://localhost:4000/details", {
                headers: {
                    Authorization: `Bearer ${storedToken}`,
                },
            });
            setUserDetails(response.data);
        } catch (error) {
            setError('Failed to fetch user details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle Logout
    const handleLogout = () => {
        logout(); // Call the logout function
        setUserDetails(null); // Clear user details on logout
        window.location.reload(); // Force a page reload to update the UI
    };

    // Handle viewing all students
    const handleViewStudents = () => {
        setShowStudents(true);
        setShowComplaints(false);
    };

    // Handle viewing all complaints
    const handleViewComplaints = () => {
        setShowComplaints(true);
        setShowStudents(false);
    };

    return (
        <div>
            <Navbar 
                onViewDetails={handleViewDetails} 
                handleLogout={handleLogout} 
                onViewStudents={handleViewStudents} 
                onViewComplaints={handleViewComplaints}
            />

            <h1>Welcome to the Home Page</h1>
            <div className="home">
                <header className="homeheader">
                    <div className="home-header-overlay">
                        <h1>Hostel Management</h1>
                        <p className="welcome-text">Welcome to the best hostel management system!</p>
                    </div>
                </header>

                <h2 className="features-title">Our Features</h2>

                <div className="features-container">
                    <div className="feature-card">
                        <div className="icon">📅</div>
                        <h3>Manage Bookings</h3>
                        <p>Effortlessly manage your hostel bookings and check-ins.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon">🏨</div>
                        <h3>Room Availability</h3>
                        <p>Check room availability in real-time and reserve your stay.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon">🗣️</div>
                        <h3>Community Board</h3>
                        <p>Connect with fellow residents and share important updates.</p>
                    </div>
                </div>

                <footer className="footer">
                    <p>&copy; 2024 Hostel Management System. All rights reserved.</p>
                </footer>
            </div>

            {/* Show user details if available */}
            {userDetails && (
                <div className="user-details mt-4">
                    <h3>Your Details:</h3>
                    {userDetails.role === 'admin' ? (
                        <p><strong>Admin Username:</strong> {userDetails.username}</p>
                    ) : (
                        <>
                            <p><strong>Name:</strong> {userDetails.username}</p>
                            <p><strong>Surname:</strong> {userDetails.surname}</p>
                            <p><strong>College:</strong> {userDetails.college}</p>
                            <p><strong>Grad Year:</strong> {userDetails.currentYearOfGraduation}</p>
                            <p><strong>Room Number:</strong> {userDetails.roomNumber}</p>
                            <p><strong>Joined Date:</strong> {new Date(userDetails.createdAt).toLocaleDateString()}</p>
                        </>
                    )}
                </div>
            )}

            {/* Error message */}
            {error && <p>{error}</p>}

            {/* Admin-specific view students and complaints */}
            {showStudents && (
                <div>
                    <h2>All Students:</h2>
                    <AdminViewStudents /> {/* Display all students for admin */}
                </div>
            )}

            {showComplaints && (
                <div>
                    <h2>All Complaints:</h2>
                    <AdminViewComplaints /> {/* Display all complaints for admin */}
                </div>
            )}
        </div>
    );
}
