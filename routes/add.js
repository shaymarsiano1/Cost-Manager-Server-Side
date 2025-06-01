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
    const requiredFields = ['userid', 'description', 'category', 'sum'];

    // Check for required fields
    for (const field of requiredFields) {
        if (!req.body[field]) {
            return res.status(400).json({ error: `Missing required field: ${field}/api/add` });
        }
    }

    // Check if the user exists
    const userExists = await User.findOne({ id: req.body.userid });
    if (!userExists) {
        return res.status(404).json({ error: "User_not_found/api/add" });
    }

    try {
        // Ensure the date field is a valid Date object, or use current date if not provided
        const costData = { ...req.body };
        if (costData.date) {
            costData.date = new Date(costData.date);
        } else {
            costData.date = new Date();
        }

        // Save to database
        const newCost = new Cost(costData);
        const savedCost = await newCost.save();

        // Remove internal fields from the response
        const { __v, _id, ...cleanedCost } = savedCost.toObject();
        res.status(201).json(cleanedCost);
    } catch (err) {
        res.status(500).json({ error: `${err.message}/api/add` });
    }
});

module.exports = router;