// routes/statisticsRoutes.js
const express = require('express');
const router = express.Router();
const { calculateVotingStatistics } = require('../utility/statisticsUtils');

// Get statistics for a voting session
router.get('/:chainId', async (req, res) => {
  try {
    const stats = await calculateVotingStatistics(req.params.chainId);
    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error calculating statistics');
  }
});

module.exports = router;
