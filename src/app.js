const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const courseRoutes = require('./routes/courses');
const enrollmentRoutes = require('./routes/enrollments');
const instructorRoutes = require('./routes/instructors');
const videoRoutes = require('./routes/videos');
const paymentRoutes = require('./routes/payments');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/database');
const dotenv = require('dotenv');
const morgan = require("morgan");
const cors = require('cors')

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(cors())
app.use(express.json());

connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/instructors', instructorRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/payments', paymentRoutes); // this will be working soon

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
