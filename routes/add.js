/**
 * Adds a new cost for a specific user.
 *
 * @name addCost
 * @function
 * @param {object} req - The HTTP request object containing cost details in the body
 * @param {object} res - The HTTP response object
 * @param {number} req.body.userid - The ID of the user the cost belongs to
 * @param {string} req.body.description - A description of the expense
 * @param {string} req.body.category - The category of the expense (e.g., food, sport)
 * @param {number} req.body.sum - The numeric cost value
 * @param {string} [req.body.date] - Optional date string in ISO format (defaults to today)
 * @returns {object} 201 - JSON of the newly created cost
 * @returns {object} 400 - If required fields are missing
 * @returns {object} 404 - If the user does not exist
 * @returns {object} 500 - If a server error occurs
 */

const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');
const User = require('../models/User');

router.post('/', async (req, res) => {
    const { userid, description, category, sum, date } = req.body;

    // Validate required fields
    if (!userid || !description || !category || !sum) {
        return res.status(400).json({ error: "Missing required fields/api/add" });
    }

    // Check if user exists
    const userExists = await User.findOne({ id: userid });
    if (!userExists) {
        return res.status(404).json({ error: "User_not_found/api/add" });
    }

    try {
        // Create new cost object
        const newCost = new Cost({
            userid,
            description,
            category,
            sum,
            date: date ? new Date(date) : new Date() // Use provided date or current date
        });

        // Save to DB
        const savedCost = await newCost.save();

        // Return saved cost with 201 status
        res.status(201).json(savedCost);
    } catch (err) {
        // Handle server error
        res.status(500).json({ error: `${err.message}/api/add` });
    }
});

module.exports = router;
