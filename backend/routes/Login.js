const express = require('express');
const router = express.Router();
const { users, Student, Room } = require('../models');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = 'secret'; 

router.post("/signup", async (req, res) => {
    const { username, password, name, surname, college, currentYearOfGraduation, bookingStartDate, bookingEndDate, roomId } = req.body;

    // If a student, require all details
    if (req.body.role === 'student') {
        const user = await users.findOne({ where: { username: username } });

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await users.create({
            username: username,
            password: hashedPassword,
            role: 'student',
        });

        try {
            // Create student record
            const newStudent = await Student.create({
                userId: newUser.id,
                name: name,
                surname: surname,
                college: college,
                currentYearOfGraduation: currentYearOfGraduation,
                bookingStartDate: bookingStartDate,
                bookingEndDate: bookingEndDate,
                roomId: roomId,
            });

            // Mark the room as unavailable
            await Room.update({ isAvailable: false }, { where: { id: roomId } });

            return res.json("Signup successful");
        } catch (error) {
            console.error("Error creating student or updating room:", error);
            return res.status(500).json({ error: "Failed to create student or update room." });
        }
    } 

    // If admin, just create user with a role
    if (req.body.role === 'admin') {
        const user = await users.findOne({ where: { username: username } });

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await users.create({
            username: username,
            password: hashedPassword,
            role: 'admin',
        });

        return res.json("Admin signup successful");
    }

    return res.status(400).json({ error: "Invalid role" });
});



router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await users.findOne({ where: { username: username } });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: "Invalid password" });
        }

        const accessToken = jwt.sign({ username: user.username, id: user.id, role: user.role }, secretKey);
        res.json({ token: accessToken });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
