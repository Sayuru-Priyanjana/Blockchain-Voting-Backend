// blockRoutes.js
const express = require('express');
const router = express.Router();
const { createBlock, verifyChain, getBlocks } = require('../utility/blockUtils');

// Cast a vote (create block)
router.post('/:chainId/vote', async (req, res) => {
  try {
    const { voterAnonId, candidate } = req.body;
    if (!voterAnonId || !candidate) return res.status(400).send('Missing vote data');

    const block = await createBlock(req.params.chainId, { voterAnonId, candidate });
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
