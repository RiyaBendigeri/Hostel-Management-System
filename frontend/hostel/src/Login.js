import React, { useState, useEffect } from 'react';
import { useAuth } from './Authcontext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar'; // Import the Navbar
export default function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState('');

    const { login, isAuthenticated, logout } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        
        if (!username || !password) {
            setError("Please enter both username and password.");
            setLoading(false);
            return;
        }

        const data = { username, password };
        
        try {
            const response = await axios.post("http://localhost:4000/login", data);
            if (response.data && response.data.token) {
                login(response.data.token);
                setUserDetails(null);
                setError(null);
                navigate('/');
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || 'Login failed');
            } else {
                setError('No response from the server. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

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
                    Authorization: `Bearer ${storedToken}`
                }
            });
            setUserDetails(response.data);
        } catch (error) {
            setError('Failed to fetch user details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        setUserDetails(null); // Clear the user details from the state
        navigate('/login');
    };

    return (
        <div>
            <Navbar></Navbar>
            {!isAuthenticated && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            id="exampleInputEmail1" 
                            onChange={(e) => setUserName(e.target.value)} 
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input 
                            type="password" 
                            className="form-control" 
                            id="exampleInputPassword1" 
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="btn btn-primary" 
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Submit'}
                    </button>
                </form>
            )}

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {isAuthenticated && (
                <div>
                    <button 
                        className="btn btn-info mt-3" 
                        onClick={handleViewDetails}
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'View My Details'}
                    </button>
                    <button className="btn btn-danger mt-3" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}

            {userDetails && (
                <div className="user-details mt-4">
                    <h3>Your Details:</h3>
                    {userDetails.role === 'admin' ? (
                        <p><strong>Admin Username:</strong> {userDetails.username}</p> // Show only username for admin
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
        </div>
    );
}

/*import React, { useState, useEffect } from 'react';
import { useAuth } from './Authcontext';
import { useNavigate, Link } from 'react-router-dom'; // Added Link for navigation
import axios from 'axios';
import './Login.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingUser } from '@fortawesome/free-solid-svg-icons';
import Loginbg from './Loginbg.jpg';

export default function Login() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState('');

    const { login, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
       
        if (!username || !password) {
            setError("Please enter both username and password.");
            setLoading(false);
            return;
        }

        const data = { username, password };
       
        try {
            const response = await axios.post("http://localhost:4000/login", data);
            if (response.data && response.data.token) {
                login(response.data.token);
                setUserDetails(null);
                setError(null);
                navigate('/');
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error || 'Login failed');
            } else {
                setError('No response from the server. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

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
                    Authorization: `Bearer ${storedToken}`
                }
            });
            setUserDetails(response.data);
        } catch (error) {
            setError('Failed to fetch user details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
        setUserDetails(null);
        navigate('/login');
    };

    return (
        <div>
           
            <div className="Login-manual-navbar">
                <div >
                    <FontAwesomeIcon icon={faBuildingUser} size="3x" style={{ color: 'white',marginLeft:'0%',marginRight:'20px'}} />
                </div>
                <button style={{'marginLeft':'25px'}}>
                    <Link to="/" className="Login-nav-link">Home</Link>
                </button >
                <button style={{'marginLeft':'25px'}}>
                    <Link to="/login" className="Login-nav-link">Login</Link>
                </button>
                <button style={{'marginLeft':'25px'}}>
                    <Link to="/signup" className="Login-nav-link">Signup</Link>
                </button>
                <div className="Login-profile-section" >
                <svg style={{'marginLeft':'500px'}}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="30"
    height="30"
    fill="white"
    className="help-icon"
>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-14h-2v2h2v-2zm0 4h-2v6h2v-6z" />
</svg>

                    <button style={{'marginLeft':'10px' , marginTop:'2px' ,height:'70px'}}>
                    <Link to="/#" className="Login-nav-link">Help</Link>
                </button>
                </div>
               
            </div>
           
           
            <div className='Login-Container'>
            <div className="Image-Container">
                <img src={Loginbg} alt="Cover Image" />      
            </div>
                {!isAuthenticated && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="exampleInputPassword1"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={loading}
                        >
                            {loading ? 'Logging in...' : 'Submit'}
                        </button>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                    </form>
                )}

               

                {isAuthenticated && (
                    <div>
                        <button
                            className="btn btn-info mt-3"
                            onClick={handleViewDetails}
                            disabled={loading}
                        >
                            {loading ? 'Loading...' : 'View My Details'}
                        </button>
                        <button className="btn btn-danger mt-3" onClick={handleLogout}>
                            Logout
                        </button>
                    </div>
                )}

                {userDetails && (
                    <div className="user-details mt-4">
                        <h3>Your Details:</h3>
                        {userDetails.role === 'admin' ? (
                            <p><strong>Admin Username:</strong> {userDetails.username}</p> // Show only username for admin
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
            </div>
            <footer class="Login-footer" >
        <div class="Login-social-media">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-twitter"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <i class="fab fa-linkedin-in"></i>
            </a>
        </div>
    <p >&copy; 2024 Hostel Management system. All Rights Reserved.</p>
    <p className="footer-quote">“Your home away from home.”</p>
</footer>
        </div>
    );
}
*/