const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Uncommented and added CORS
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const enrollmentRoutes = require('./routes/enrollments');
const instructorRoutes = require('./routes/instructors');
const videoRoutes = require('./routes/videos'); // Keep video routes separately
const paymentRoutes = require('./routes/payments');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv');
const morgan = require("morgan");
dotenv.config();

const app = express();
app.use(morgan("dev"));

const corsOptions = {
    origin: 'http://localhost:3001',  // Specify your frontend origin
    credentials: true,  // Enable credentials
  };
  
  // Middleware
  app.use(cors(corsOptions)); // Use the CORS configuration
  app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes); // Courses routes
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/videos', videoRoutes); // Video routes moved to '/api/videos'
app.use('/api/payments', paymentRoutes);

// Error handling middleware
app.use(errorHandler);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
