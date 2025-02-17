/*import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // Default role
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const data = { username, password, role }; // Include role in data

        try {
            const response = await axios.post("http://localhost:4000/signup", data);
            console.log("Signup successful");
            navigate('/login'); // Redirect to login page after signup
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select className="form-control" id="role" onChange={(e) => setRole(e.target.value)}>
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}*/
/*import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Import the Navbar
export default function Signup() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student'); // Default role
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [college, setCollege] = useState('');
    const [currentYearOfGraduation, setCurrentYearOfGraduation] = useState('');
    const [bookingStartDate, setBookingStartDate] = useState('');
    const [bookingEndDate, setBookingEndDate] = useState('');
    const [roomId, setRoomId] = useState('');
    const [rooms, setRooms] = useState([]); // State to store available rooms
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch available rooms
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://localhost:4000/rooms");
                setRooms(response.data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
                setError("Failed to load rooms.");
            }
        };

        fetchRooms();
    }, []); // Run this effect only once when the component mounts

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        const data = { 
            username, 
            password, 
            role,
            ...(role === 'student' && { 
                name, 
                surname, 
                college, 
                currentYearOfGraduation, 
                bookingStartDate, 
                bookingEndDate, 
                roomId 
            }) 
        };

        try {
            const response = await axios.post("http://localhost:4000/signup", data);
            console.log("Signup successful");
            navigate('/login');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };
    
    return (
        <div>
            <Navbar></Navbar>
            <div>
                 <header className="Adminregheader">
                <div className="Adminreg-header-overlay">
                    <h1>Hostel Management</h1>
                    <p className="welcome-text">Welcome to the best hostel management system!</p>
                </div>
                </header>
                <h2> Register</h2>
                <div className='MainContainer'>
                   
                             <br/>
                 </div>
                </div>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select className="form-control" id="role" onChange={(e) => setRole(e.target.value)} required>
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {role === 'student' && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="surname" className="form-label">Surname</label>
                            <input type="text" className="form-control" id="surname" onChange={(e) => setSurname(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="college" className="form-label">College</label>
                            <input type="text" className="form-control" id="college" onChange={(e) => setCollege(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="currentYearOfGraduation" className="form-label">Current Year of Graduation</label>
                            <input type="number" className="form-control" id="currentYearOfGraduation" onChange={(e) => setCurrentYearOfGraduation(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bookingStartDate" className="form-label">Booking Start Date</label>
                            <input type="date" className="form-control" id="bookingStartDate" onChange={(e) => setBookingStartDate(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bookingEndDate" className="form-label">Booking End Date</label>
                            <input type="date" className="form-control" id="bookingEndDate" onChange={(e) => setBookingEndDate(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="roomId" className="form-label">Select Room</label>
                            <select className="form-control" id="roomId" onChange={(e) => setRoomId(e.target.value)} required>
                                <option value="">Select Room</option>
                                {rooms.map(room => (
                                    <option key={room.id} value={room.id}>
                                        {room.roomNumber}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}
*/
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import signuppageimage from './signuppageimage.jpeg.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faBuildingCircleArrowRight, faBuildingCircleExclamation, faBuildingUser, faHotel } from '@fortawesome/free-solid-svg-icons';



import {Link} from 'react-router-dom';

export default function Signup() {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('student');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [college, setCollege] = useState('');
    const [currentYearOfGraduation, setCurrentYearOfGraduation] = useState('');
    const [bookingStartDate, setBookingStartDate] = useState('');
    const [bookingEndDate, setBookingEndDate] = useState('');
    const [roomId, setRoomId] = useState('');
    const [rooms, setRooms] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await axios.get("http://localhost:4000/rooms");
                setRooms(response.data);
            } catch (error) {
                console.error("Error fetching rooms:", error);
                setError("Failed to load rooms.");
            }
        };

        fetchRooms();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
       
        const data = {
            username,
            password,
            role,
            ...(role === 'student' && {
                name,
                surname,
                college,
                currentYearOfGraduation,
                bookingStartDate,
                bookingEndDate,
                roomId
            })
        };

        try {
            const response = await axios.post("http://localhost:4000/signup", data);
            console.log("Signup successful");
            navigate('/login');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.error);
            } else {
                setError('An unexpected error occurred.');
            }
        }
    };
   
    return (
            <div>
        <div className="Form-Container">
       
               <div className="manual-navbar">
               <div>
                        <FontAwesomeIcon icon={faBuildingUser} size="3x" style={{ color: 'white' }} />
                    </div>
                <button ><Link to="/" className="nav-link" >Home</Link></button>
                <button><Link to="/login" className="nav-link">Login</Link></button>
                <button><Link to="/signup" className="nav-link">Signup</Link></button>
                <div className="profile-section">
                <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="30"
    height="30"
    fill="white"
    className="help-icon"
>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm1-14h-2v2h2v-2zm0 4h-2v6h2v-6z" />
</svg>

               <button className="Help-button">Help</button>
                        </div>
                </div>
               
               
            <div className="Image-Container">
                <img src={signuppageimage} alt="Cover Image" />      
            </div>
           

            <form onSubmit={handleSubmit}>
                 <b><i><h3 style={{'marginLeft':'40%' ,'fontWeight':'bolder','color':' #5b0eb2'}}>Fill Details</h3></i></b>
                <div className="content">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control" id="username" onChange={(e) => setUserName(e.target.value)} required />
                </div>
                <div className="content">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="content">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select className="form-control" id="role" onChange={(e) => setRole(e.target.value)} required>
                        <option value="student">Student</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {role === 'student' && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="surname" className="form-label">Surname</label>
                            <input type="text" className="form-control" id="surname" onChange={(e) => setSurname(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="college" className="form-label">College</label>
                            <input type="text" className="form-control" id="college" onChange={(e) => setCollege(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="currentYearOfGraduation" className="form-label">Current Year of Graduation</label>
                            <input type="number" className="form-control" id="currentYearOfGraduation" onChange={(e) => setCurrentYearOfGraduation(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bookingStartDate" className="form-label">Booking Start Date</label>
                            <input type="date" className="form-control" id="bookingStartDate" onChange={(e) => setBookingStartDate(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="bookingEndDate" className="form-label">Booking End Date</label>
                            <input type="date" className="form-control" id="bookingEndDate" onChange={(e) => setBookingEndDate(e.target.value)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="roomId" className="form-label">Select Room</label>
                            <select className="form-control" id="roomId" onChange={(e) => setRoomId(e.target.value)} required>
                                <option value="">Select Room</option>
                                {rooms.map(room => (
                                    <option key={room.id} value={room.id}>
                                        {room.roomNumber}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
                <button type="submit" className="btn btn-primary">Submit</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>  
        </div>
        <footer class="Signup-footer" >
        <div class="social-media">
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
