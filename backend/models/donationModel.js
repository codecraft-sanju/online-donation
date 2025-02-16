const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  date: { type: Date, default: Date.now },
});

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;
