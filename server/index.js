import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes.js'; 
import coursesRoutes from './routes/courseRoutes.js'
import adminRoutes from './routes/adminRoutes.js'


dotenv.config();

const app = express();

//using middlewares
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connecting to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch(err => {
        console.error('Failed to connect to MongoDB', err);
    });

// Define a simple route
app.get('/', (req, res) => {
    res.send(`Server is working on port ${PORT}`);
});

//get all  uploads
app.use("/uploads",express.static("uploads"))

// Using routes
app.use("/api", userRoutes);
app.use("/api", coursesRoutes);
app.use("/api", adminRoutes);


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
