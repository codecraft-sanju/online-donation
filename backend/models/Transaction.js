import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  familyMember: String,
  amount: Number,
  type: { type: String, enum: ['donation', 'expense'] },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model('Transaction', transactionSchema);
