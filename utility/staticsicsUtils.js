// utils/statisticsUtils.js
const Block = require('../models/blockModel');
const VotingSession = require('../models/VotingSession'); 

async function calculateVotingStatistics(chainId) {
  // 1. Get voting session
  const session = await VotingSession.findOne({ _id: chainId });
  if (!session) throw new Error('Voting session not found');

  // 2. Get all blocks (votes) for this chain
  const blocks = await Block.find({ chainId: session._id.toString() });

  const totalVotes = blocks.length;

  const candidateCounts = {};
  session.candidates.forEach(c => {
    candidateCounts[c._id.toString()] = 0;
  });

  // Count votes
  blocks.forEach(block => {
    const candidateId = block.voteData.candidate; // now storing _id as string
    if (candidateCounts.hasOwnProperty(candidateId)) candidateCounts[candidateId]++;
  });

  // Prepare results
  const result = session.candidates.map(c => {
    const count = candidateCounts[c._id.toString()] || 0;
    const percentage = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(2) : '0.00';
    return {
      name: c.name,
      party: c.party,
      votes: count,
      percentage: parseFloat(percentage)
    };
  });

  // 6. Sort descending by votes
  result.sort((a, b) => b.votes - a.votes);

  return {
    sessionName: session.name,
    totalVotes,
    results: result
  };
}

module.exports = { calculateVotingStatistics };