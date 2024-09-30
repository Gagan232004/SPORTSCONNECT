const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PlayersModel = require("./models/Players");
const bcrypt = require("bcrypt"); // For password hashing
const authRoutes = require('./routes/auth'); // Import the routes

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Atlas connection (replace <username>, <password>, and <dbname> with your actual credentials)
mongoose.connect("mongodb+srv://Gagan209:gagan%40209@sportsconnect.0tosd.mongodb.net/?retryWrites=true&w=majority&appName=SPORTSCONNECT", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Register endpoint
app.post('/register', async (req, res) => {
    const { name, age, gender, email, mobile, password } = req.body;

    // Basic validation
    if (!name || !age || !email || !mobile || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if user already exists
        const existingUser = await PlayersModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newPlayer = new PlayersModel({ name, age, gender, email, mobileno: mobile, password: hashedPassword });

        // Save user to database
        const savedPlayer = await newPlayer.save();
        res.status(201).json(savedPlayer);
    } catch (err) {
        console.error("Error creating player:", err);
        res.status(500).json({ error: "Failed to create player" });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Find user by email
        const user = await PlayersModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // Login successful
        res.status(200).json({ message: "Login successful", user });
    } catch (err) {
        console.error("Error during login:", err);
        res.status(500).json({ error: "Login failed" });
    }
});

// Start the server
app.listen(3002, () => {
    console.log("Server is running on port 3002");
});
