/**
 * Returns a monthly report of user costs grouped by category.
 *
 * @name getMonthlyReport
 * @function
 * @param {object} req - The HTTP request object
 * @param {object} req.query - The query parameters
 * @param {string} req.query.id - The ID of the user to retrieve the report for
 * @param {string} req.query.year - The report year (e.g., "2025")
 * @param {string} req.query.month - The report month (1–12)
 * @param {object} res - The HTTP response object
 *
 * @returns {object} 200 - JSON object with the following structure:
 * {
 *   userid: number,
 *   year: number,
 *   month: number,
 *   costs: [
 *     { food: [{ sum: number, description: string, day: number }] },
 *     { health: [{ ... }] },
 *     { housing: [{ ... }] },
 *     { sport: [{ ... }] },
 *     { education: [{ ... }] }
 *   ]
 * }
 *
 * @returns {object} 400 - If required parameters are missing or invalid
 * @returns {object} 500 - If a server error occurs
 */

const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');

router.get('/', async (req, res) => {
    const { id, year, month } = req.query;

    // Validate presence of required query parameters
    if (!id || !year || !month) {
        return res.status(400).json({ error: 'Missing parameters/api/report' });
    }

    // Validate that all query values are numeric
    if (isNaN(Number(id)) || isNaN(Number(year)) || isNaN(Number(month))) {
        return res.status(400).json({ error: 'Invalid query values/api/report' });
    }

    // Validate month value is in range 1–12
    if (Number(month) < 1 || Number(month) > 12) {
        return res.status(400).json({ error: 'Invalid month value/api/report' });
    }

    // Create date range for filtering by month
    const start = new Date(Number(year), Number(month) - 1, 1);
    const end = new Date(Number(year), Number(month), 1);

    try {
        // Retrieve all cost entries for the given user and date range
        const costs = await Cost.find({
            userid: parseInt(id),
            date: { $gte: start, $lt: end }
        });

        // Define fixed cost categories and group the data accordingly
        const categories = ['food', 'health', 'housing', 'sport', 'education'];
        const grouped = categories.map((cat) => ({
            [cat]: costs
                .filter((item) => item.category === cat)
                .map((item) => ({
                    sum: item.sum,
                    description: item.description,
                    day: item.date.getDate()
                }))
        }));

        // Respond with structured report
        res.json({
            userid: parseInt(id),
            year: parseInt(year),
            month: parseInt(month),
            costs: grouped
        });
    } catch (err) {
        // Handle server errors
        res.status(500).json({
            error: `${err.message}/api/report`
        });
    }
});

module.exports = router;
