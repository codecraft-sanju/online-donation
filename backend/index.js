import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './db.js';
import Transaction from './models/Transaction.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

//Fetch all transactions from MongoDB
app.get('/transactions', async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});


// ✅ Add a new transaction
app.post('/transactions', async (req, res) => {
  try {
    const { familyMember, amount, type } = req.body;
    const newTransaction = new Transaction({ familyMember, amount, type });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to save transaction' });
  }
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
