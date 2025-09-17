const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true }, // auto-generated candidate ID
  name: { type: String, required: true },
  party: { type: String }
});

const votingSessionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['ongoing', 'closed', 'finalized'], default: 'ongoing' },
  genesisHash: { type: String, required: true },
  preferredAge: { type: Number, default: 18 },
  candidates: [candidateSchema]
});

// _id of the votingSession serves as the chainId
module.exports = mongoose.model('VotingSession', votingSessionSchema);
