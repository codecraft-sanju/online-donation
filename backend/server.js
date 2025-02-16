const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const donationRoutes = require('./routes/donationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/donations', donationRoutes);

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/donations', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
