const mongoose = require('mongoose');

/**
 * Closes MongoDB connection after all tests finish.
 */
afterAll(async () => {
    await mongoose.connection.close();
});
