const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { userid, description, category, sum, date } = req.body;

    if (!userid || !description || !category || !sum) {
        return res.status(400).json({ error: "Missing required fields/api/add" });
    }

    // בדיקה אם המשתמש קיים
    const userExists = await User.findOne({ id: userid });
    if (!userExists) {
        return res.status(404).json({ error: "User_not_found/api/add" });
    }

    try {
        const newCost = new Cost({
            userid,
            description,
            category,
            sum,
            date: date ? new Date(date) : new Date()
        });

        const savedCost = await newCost.save();
        res.status(201).json(savedCost);
    } catch (err) {
        res.status(500).json({ error: `${err.message}/api/add` });

    }
});

module.exports = router;
