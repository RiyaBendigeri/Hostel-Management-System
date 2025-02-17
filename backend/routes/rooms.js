const express = require('express');
const router = express.Router();
const { Room } = require('../models');  // Assuming you have a Room model

// Test route to check if route is working
router.get('/test', (req, res) => {
    res.send('Rooms route is working!');
});

// Rooms route to get all rooms
router.get("/", async (req, res) => {
    try {
        const availableRooms = await Room.findAll({ where: { isAvailable: true } }); // Fetch only available rooms
        res.json(availableRooms);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router;
