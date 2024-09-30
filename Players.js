const mongoose = require('mongoose');

const PlayerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
        min: 0
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'], // Limits the gender options
    },
    email: {
        type: String,
        required: true,
        unique: true, // Makes sure no two players can have the same email
        match: [/.+\@.+\..+/, 'Please enter a valid email address'] // Email validation
    },
    mobileno: {
        type: String,
        required: true,
        unique: true,
        minlength: 10,
        maxlength: 10
    }
});

const PlayersModel = mongoose.model('players', PlayerSchema);
module.exports = PlayersModel;
