/**
 * Returns basic information about the project authors.
 *
 * @name getAboutInfo
 * @function
 * @param {object} req - The HTTP request object
 * @param {string} [req.query.forceError] - Optional flag (?forceError=true) to simulate a server error
 * @param {object} res - The HTTP response object
 * @returns {object} 200 - JSON array of author objects
 * @returns {object} 500 - If a simulated or unexpected server error occurs
 */

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        // Simulate a failure if the query parameter ? forceError=true is provided
        if (req.query.forceError === 'true') {
            throw new Error('Simulated failure');
        }

        // Respond with basic info about the authors
        res.json([
            { first_name: "Shay", last_name: "Marsiano" },
            { first_name: "Eilon", last_name: "Ashkenazy" }
        ]);
    } catch (err) {
        // Handle errors (simulated or real)
        res.status(500).json({ error: `${err.message}/api/about` });
    }
});

module.exports = router;