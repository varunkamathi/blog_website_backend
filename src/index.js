import express from 'express';
import cors from 'cors'; // For handling Cross-Origin requests
import dotenv from 'dotenv';
import connectDB from '../src/db.js';
import authRoutes from './routes/auth.routes.js'


// Load environment variables from .env file
dotenv.config({
    path : "./env"
});

// Initialize the app
const app = express();

// Middleware
const corsOptions = {
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Allow cookies to be sent
  };
app.use(express.json()); // Parse JSON bodies
app.use(cors(corsOptions)); // Enable CORS for all routes
//app.use(cookieParser());


// Connect to MongoDB
connectDB()


// Basic route for testing
// Import routes
/*import authRoutes from './routes/auth.routes.js'; // Import the auth routes
app.use('/api/users', authRoutes);*/
app.use('/api/auth', authRoutes);


app.use((err, req , res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
