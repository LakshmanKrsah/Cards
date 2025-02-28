require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// CORS Configuration
app.use(cors({
  origin: 'https://your-frontend-url.vercel.app',  // Replace with your actual frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Mongoose Schema & Model
const cardSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    description: String,
    img: String
});
const Card = mongoose.model('Card', cardSchema);

// API Endpoint to Get Cards
app.get('/api/cards', async (req, res) => {
    try {
        const cards = await Card.find();
        res.json(cards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Health Check Route
app.get('/', (req, res) => {
    res.send("Backend is running");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
