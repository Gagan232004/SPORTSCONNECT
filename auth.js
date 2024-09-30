const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');

// Use middleware
app.use(cors());
app.use(express.json());  // To parse JSON bodies

// MongoDB connection setup
mongoose.connect('mongodb+srv://Gagan209:gagan%40209@sportsconnect.0tosd.mongodb.net/?retryWrites=true&w=majority&appName=SPORTSCONNECT', { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

// Schema for players (replace with your desired schema)
const playerSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    email: String,
    mobileno: String,
});

// Model for players
const PlayersModel = mongoose.model('Player', playerSchema);

// POST route for /register

// Add console logs


app.post('/register', async (req, res) => {

    console.log("Received registration data:", req.body);
    const { name, age, gender, email, mobileno } = req.body;
    
    try {
        const newPlayer = new PlayersModel({ name, age, gender, email, mobileno });
        const savedPlayer = await newPlayer.save();
        res.status(201).json(savedPlayer);  // Respond with the saved player
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Listening on port 3001
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
