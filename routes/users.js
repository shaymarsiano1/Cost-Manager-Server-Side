const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Cost = require('../models/Cost');

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    // בדיקה מוקדמת: האם ID הוא מספר
    if (isNaN(Number(id))) {
        return res.status(500).json({
            error: `Invalid user ID (/api/users/${id})`
        });
    }

    try {
        const numericId = parseInt(id);
        const user = await User.findOne({ id: numericId });

        if (!user) {
            return res.status(404).json({
                error: `User not found (/api/users/${id})`
            });
        }

        const costs = await Cost.find({ userid: numericId });
        const total = costs.reduce((acc, curr) => acc + curr.sum, 0);

        res.json({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            total
        });
    } catch (err) {
        res.status(500).json({
            error: `${err.message} (/api/users/${id})`
        });
    }
});

module.exports = router;
