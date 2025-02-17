// student.js
/*const express = require('express');
const router = express.Router();
const { Student } = require('../models');
const authenticateToken = require('../middleware/authMiddleware'); // Import correctly

// Route to get student details by user ID
router.get('/', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from the JWT token
        const student = await Student.findOne({ where: { userId: userId } });
        
        if (!student) {
            return res.status(404).json({ error: 'Student not found' });
        }

        res.json(student); // Send the student details back to the frontend
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({ error: 'Failed to fetch student details' });
    }
});

module.exports = router; // Ensure the router is exported correctly*/
// student.js
const express = require('express');
const router = express.Router();
const { users, Student, Room } = require('../models'); // Import models
const authenticateToken = require('../middleware/authMiddleware'); // Import correctly

// Route to get student details by user ID
router.get('/', authenticateToken, async (req, res) => {
    try {
        const { role, id } = req.user;  // Get role and id from the token

        if (role === 'admin') {
            // Fetch admin details from users table
            const admin = await users.findOne({
                where: { id: id }, // Find admin by their user ID
                attributes: ['username', 'role']  // Only fetch relevant fields
            });
            if (admin) {
                return res.json(admin);
            } else {
                return res.status(404).json({ error: "Admin details not found" });
            }
        } else if (role === 'student') {
            // Fetch student details along with their room details
            const student = await Student.findOne({
                where: { userId: id },  // Use the correct user ID from the token
                include: {
                    model: Room, // Use the Room model for the join
                    attributes: ['roomNumber'] // Specify the roomNumber to include in the response
                }
            });

            if (!student) {
                return res.status(404).json({ error: 'Student not found' });
            }

            // Format the response to include room number
            return res.json({
                id: student.id,
                username: student.name,
                surname: student.surname,
                college: student.college,
                currentYearOfGraduation: student.currentYearOfGraduation,
                roomNumber: student.Room ? student.Room.roomNumber : null // Include room number if it exists
            });
        } else {
            return res.status(400).json({ error: 'Invalid role' });
        }
    } catch (error) {
        console.error('Error fetching student details:', error);
        res.status(500).json({ error: 'Failed to fetch student details' });
    }
});

module.exports = router;
