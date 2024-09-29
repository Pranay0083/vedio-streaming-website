const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/vedioRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subscriptionRoutes = require('./routes/subscriptionsRoutes');
const viewRoutes = require('./routes/viewRoutes');
const commentRoutes = require('./routes/commentsRoutes');
require('dotenv').config();
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(morgan("dev"));

app.use('/users', userRoutes);
app.use('/videos', videoRoutes);
app.use('/categories', categoryRoutes);
app.use('/subscriptions', subscriptionRoutes);
app.use('/views', viewRoutes);
app.use('/comments', commentRoutes);


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