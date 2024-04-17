require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
const userRoutes = require('./routes/userRoute');
const propertyRoutes = require('./routes/propertyRoute')
const mailsRoutes = require('./routes/mailRoute')

app.use('/users', userRoutes);
app.use('/properties', propertyRoutes)
app.use('/mails', mailsRoutes)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
