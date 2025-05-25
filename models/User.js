const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        required: true
    },
    marital_status: {
        type: String,
        enum: ['single', 'married', 'divorced', 'widowed'],
        required: true
    }
});

module.exports = mongoose.model('User', UserSchema);