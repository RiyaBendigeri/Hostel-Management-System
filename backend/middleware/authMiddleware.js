// authMiddleware.js
const jwt = require('jsonwebtoken');
const secretKey = 'secret';  // The same secret key used during token creation

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Extract the token from the header

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token.' });
        }

        req.user = user;  // Attach the user info (from the token) to the request object
        next();  // Call the next middleware or route handler
    });
};

module.exports = authenticateToken;

//DO THIS WITHOUT FAILURE
/*const express = require('express');
const router = express.Router();
const authMiddleware = require('./middleware/authMiddleware'); // Adjust path as necessary

// Example of a protected route
router.get("/students-data", authMiddleware, async (req, res) => {
    // Only authenticated users can access this route
    const students = await getStudentsData(); // Your logic to fetch students data
    res.json(students);
});

// Other routes (like signup, login) can remain public*/
/*const fetchData = async () => {
    const token = sessionStorage.getItem("accessToken");
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    try {
        const response = await axios.get("http://localhost:4000/students-data", config);
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
};*/