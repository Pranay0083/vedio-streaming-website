const express = require('express');
const userRoutes = require('./routes/userRoutes')
const vedioRoutes = require('./routes/vedioRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const enrollmentRoutes = require('./routes/enrollmentRoutes')
const courseRoutes = require('./routes/courseRoutes')
const morgan = require("morgan");
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

// app.use('/', (req, res) => {
//   res.send('Hello World');
// });
app.use('/users', userRoutes)
app.use('/vedio', vedioRoutes)
app.use('/payment', paymentRoutes)
app.use('/enrollment', enrollmentRoutes)
app.use('/course', courseRoutes)

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});