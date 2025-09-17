// blockRoutes.js
const express = require('express');
const router = express.Router();
const crypto = require('crypto');
require('dotenv').config();
const { createBlock, verifyChain, getBlocks } = require('../utility/blockUtils');
const Block = require('../models/blockModel');



router.post('/:chainId/vote', async (req, res) => {
  try {
    const { voterId, candidate } = req.body;
    const { chainId } = req.params;

    if (!voterId || !candidate) return res.status(400).send('Missing vote data');

    // Calculate anonymized voter ID
    const SERVER_SECRET = process.env.VOTER_SECRET;
    const voterAnonId = crypto.createHash('sha256').update(voterId + chainId + SERVER_SECRET).digest('hex');

    // Check if voter already voted in this chain
    const alreadyVoted = await Block.findOne({ chainId, 'voteData.voterAnonId': voterAnonId });
    if (alreadyVoted) {
      return res.status(400).json({ message: 'You have already voted in this session.' });
    }

    // Create block
    const block = await createBlock(chainId, { voterAnonId, candidate });
    res.json(block);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating block');
  }
});



// Get all blocks for a chain
router.get('/:chainId', async (req, res) => {
  try {
    const blocks = await getBlocks(req.params.chainId);
    res.json(blocks);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching blocks');
  }
});

// Verify chain integrity
router.get('/:chainId/verify', async (req, res) => {
  try {
    const isValid = await verifyChain(req.params.chainId);
    res.json({ valid: isValid });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error verifying chain');
  }
});

module.exports = router;