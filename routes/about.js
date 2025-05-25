const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    try {
        if (req.query.forceError === 'true') {
            throw new Error('Simulated failure'); // ← זורק שגיאה לצורך הבדיקה
        }

        res.json([
            { first_name: "Shay", last_name: "Marsiano" },
            { first_name: "Eilon", last_name: "Ashkenazy" }
        ]);
    } catch (err) {
        res.status(500).json({ error: `${err.message}/api/about` });
    }
});

module.exports = router;
