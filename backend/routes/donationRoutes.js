const express = require('express');
const Donation = require('../models/donationModel');

const router = express.Router();

// Get all donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find();
    res.json(donations);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Post a new donation
router.post('/', async (req, res) => {
  try {
    const { name, amount } = req.body;
    const newDonation = new Donation({ name, amount });
    await newDonation.save();
    res.status(201).json(newDonation);
  } catch (err) {
    res.status(400).send(err);
  }
});

module.exports = router;
