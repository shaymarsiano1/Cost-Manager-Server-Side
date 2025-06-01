/**
 * Retrieves user details and the total sum of their costs by user ID.
 *
 * @name getUserWithTotalCosts
 * @function
 * @param {object} req - The HTTP request object
 * @param {object} req.params - The route parameters
 * @param {string} req.params.id - The user ID to retrieve (should be a valid number)
 * @param {object} res - The HTTP response object
 *
 * @returns {object} 200 - JSON object:
 * {
 *   id: number,
 *   first_name: string,
 *   last_name: string,
 *   total: number
 * }
 * @returns {object} 404 - If the user is not found
 * @returns {object} 500 - If the ID is invalid or a server error occurs
 */

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Cost = require('../models/Cost');

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    // Check if the ID is a valid number
    if (isNaN(Number(id))) {
        return res.status(500).json({
            error: `Invalid user ID (/api/users/${id})`
        });
    }

    try {
        const numericId = parseInt(id);

        // Find the user in the database by ID
        const user = await User.findOne({ id: numericId });

        if (!user) {
            // Return 404 if the user doesn't exist
            return res.status(404).json({
                error: `User not found (/api/users/${id})`
            });
        }

        // Find all costs associated with the user
        const costs = await Cost.find({ userid: numericId });

        // Calculate the total sum of all user costs
        const total = costs.reduce((acc, curr) => acc + curr.sum, 0);

        // Respond with user info and total cost
        res.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            total
        });
    } catch (err) {
        // Handle any unexpected server errors
        res.status(500).json({
            error: `${err.message} (/api/users/${id})`
        });
    }
});

module.exports = router;