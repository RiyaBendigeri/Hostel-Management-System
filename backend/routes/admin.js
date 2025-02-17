const express = require('express');
const router = express.Router();
const { Student, Room } = require('../models'); // Assuming you have Student and Room models
const authenticateToken = require('../middleware/authMiddleware');

// Route for admin to view all students and their rooms
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { role } = req.user;

    if (role !== 'admin') {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    const students = await Student.findAll({
      include: {
        model: Room,
        attributes: ['roomNumber']
      }
    });

    const formattedStudents = students.map(student => ({
      id: student.id,
      name: student.name,
      roomNumber: student.Room.roomNumber
    }));

    res.json(formattedStudents);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});





module.exports = router;
