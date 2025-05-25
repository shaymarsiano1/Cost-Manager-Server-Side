const express = require('express');
const router = express.Router();
const Cost = require('../models/Cost');

router.get('/', async (req, res) => {
    const { id, year, month } = req.query;

    // ✅ שלב ראשון – בדיקות תקינות הקלט
    if (!id || !year || !month) {
        return res.status(400).json({ error: 'Missing parameters/api/report' });
    }

    if (isNaN(Number(id)) || isNaN(Number(year)) || isNaN(Number(month))) {
        return res.status(400).json({ error: `Invalid query values/api/report` });
    }

    if (Number(month) < 1 || Number(month) > 12) {
        return res.status(400).json({ error: `Invalid month value/api/report` });
    }

    // ✅ אם הכל תקין – המשיכי
    const start = new Date(Number(year), Number(month) - 1, 1);
    const end = new Date(Number(year), Number(month), 1);

    try {
        const costs = await Cost.find({
            userid: parseInt(id),
            date: { $gte: start, $lt: end }
        });

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

        res.json({
            userid: parseInt(id),
            year: parseInt(year),
            month: parseInt(month),
            costs: grouped
        });
    } catch (err) {
        res.status(500).json({
            error: `${err.message}/api/report`
        });
    }
});

module.exports = router;
