const mongoose = require('mongoose');

/**
 * Cost model schema.
 *
 * Represents a single expense made by a user, including mandatory fields
 * such as user ID, description, category, sum, and date.
 *
 * The schema is flexible and allows dynamic additional fields
 * that are not explicitly defined (strict: false).
 *
 * Allowed categories: 'food', 'health', 'housing', 'sport', 'education'
 */

const CostSchema = new mongoose.Schema({

    //The ID of the user who created the cost
    userid: {
        type: Number,
        required: true
    },

    // A short description of the cost (e.g., "Pizza", "Gym membership")
    description: {
        type: String,
        required: true
    },

    /**
     * The category of the cost.
     * Must be one of the predefined valid categories.
     */
    category: {
        type: String,
        enum: ['food', 'health', 'housing', 'sport', 'education'],
        required: true
    },

    // The numerical amount of the cost
    sum: {
        type: Number,
        required: true
    },

    /**
     * The date and time of the cost.
     * If not provided, the current date and time is used.
     */
    date: {
        type: Date,
        default: Date.now
    }

}, { strict: false }); // Allow dynamic fields beyond those defined above

// Export the Cost model based on the schema
module.exports = mongoose.model('Cost', CostSchema);