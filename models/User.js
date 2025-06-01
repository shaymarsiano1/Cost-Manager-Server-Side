const mongoose = require('mongoose');

/**
 * User model schema.
 *
 * Represents a registered user in the system, including personal details
 * such as ID, full name, birthday, and marital status.
 *
 * Each user must have a unique ID.
 * Marital status must be one of: 'single', 'married', 'divorced', 'widowed'.
 */

const UserSchema = new mongoose.Schema({
    // Unique numeric ID for the user
    id: {
        type: Number,
        required: true,
        unique: true
    },

    // First name of the user
    first_name: {
        type: String,
        required: true
    },

    // Last name of the user
    last_name: {
        type: String,
        required: true
    },

    // User's date of birth
    birthday: {
        type: Date,
        required: true
    },

    /**
     * Marital status of the user.
     * Must be one of the predefined values.
     */
    marital_status: {
        type: String,
        enum: ['single', 'married', 'divorced', 'widowed'],
        required: true
    }
});

// Export the User model based on the schema
module.exports = mongoose.model('User', UserSchema);