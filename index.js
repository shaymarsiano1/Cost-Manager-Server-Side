require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// יצירת אפליקציה
const app = express();
app.use(cors());
app.use(express.json());

// התחברות למונגו
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('✅ Connected to MongoDB Atlas'))
    .catch((err) => console.error('❌ Error connecting to MongoDB:', err));

// נתיבים
app.use('/api/add', require('./routes/add'));
app.use('/api/report', require('./routes/report'));
app.use('/api/users', require('./routes/users'));
app.use('/api/about', require('./routes/about'));

// הרצת השרת
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

