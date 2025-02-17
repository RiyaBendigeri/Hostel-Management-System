const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware'); // Import correctly
const {Complaint,Student} = require('../models'); // Sequelize complaint model

// Get all complaints (for admin)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const { role } = req.user; // Get the role from token
        if (role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const complaints = await Complaint.findAll(); // You can also include related student details
        res.json(complaints);
    } catch (error) {
        console.error('Error fetching complaints:', error);
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});




router.post('/', authenticateToken, async (req, res) => {
    try {
        const { complaintText } = req.body; // Extract complaint text from the request body
        
        const { role } = req.user;
        console.log(req.user);
        if (role !== 'student') {
            return res.status(403).json({ message: 'Forbidden: Only students can submit complaints.' });
        }
        const student = await Student.findOne({ where: { userId: req.user.id } });
if (!student) {
    return res.status(404).json({ message: 'Student not found' });
}

const newComplaint = await Complaint.create({
    complaintText,
    studentId: student.id,  // Use the correct student.id
    status: 'not resolved',
});

        res.json(newComplaint);
    } catch (error) {
        console.error('Error details:', error); // Log the error details
        res.status(500).json({ message: 'Failed to submit complaint' });
    }
});
// Update complaint status (admin action)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { role } = req.user;
        if (role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized' });
        }

        const complaint = await Complaint.findByPk(req.params.id);
        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found' });
        }

        complaint.status = 'seen'; // Update status
        await complaint.save();

        res.json({ message: 'Status updated to seen' });
    } catch (error) {
        console.error('Error updating complaint:', error);
        res.status(500).json({ error: 'Failed to update status' });
    }
});
// Get complaints for logged-in student
router.get('/my-complaints', authenticateToken, async (req, res) => {
    try {
        const { id } = req.user; // Get student ID from token
        const complaints = await Complaint.findAll({ where: { studentId: id } });
        res.json(complaints);
    } catch (error) {
        console.error('Error fetching student complaints:', error);
        res.status(500).json({ error: 'Failed to fetch complaints' });
    }
});

module.exports = router;
