// blockModel.js
const mongoose = require('mongoose');

const voteDataSchema = new mongoose.Schema({
  voterAnonId: { type: String, required: true },
  candidate: { type: String, required: true },
});

const blockSchema = new mongoose.Schema({
  chainId: { type: String, required: true },
  index: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  voteData: { type: voteDataSchema, required: true },
  previousHash: { type: String, required: true },
  hash: { type: String, required: true },
  nonce: { type: Number, default: 0 }
});

module.exports = mongoose.model('Block', blockSchema);
