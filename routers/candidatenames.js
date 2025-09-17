const express = require('express');
const router = express.Router();
const VotingSession = require('../models/VotingSession');
const mongoose = require('mongoose');

// GET - Get candidate by candidate ID across all voting sessions
router.get('/:candidateId', async (req, res) => {
  try {
    const { candidateId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(candidateId)) {
      return res.status(400).json({ message: 'Invalid candidate ID format' });
    }

    // Find the voting session that contains this candidate
    const votingSession = await VotingSession.findOne({
      'candidates._id': candidateId
    });

    if (!votingSession) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    // Find the specific candidate within the voting session
    const candidate = votingSession.candidates.id(candidateId);
    
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found' });
    }

    res.json({
      message: 'Candidate retrieved successfully',
      data: {
        candidateId: candidate._id,
        name: candidate.name,
        party: candidate.party,
        votingSession: {
          id: votingSession._id,
          name: votingSession.name,
          status: votingSession.status
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving candidate',
      error: error.message
    });
  }
});

// GET - Get candidate with voting session ID and candidate ID
router.get('/session/:sessionId/candidate/:candidateId', async (req, res) => {
  try {
    const { sessionId, candidateId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sessionId) || !mongoose.Types.ObjectId.isValid(candidateId)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const votingSession = await VotingSession.findById(sessionId);

    if (!votingSession) {
      return res.status(404).json({ message: 'Voting session not found' });
    }

    const candidate = votingSession.candidates.id(candidateId);
    
    if (!candidate) {
      return res.status(404).json({ message: 'Candidate not found in this voting session' });
    }

    res.json({
      message: 'Candidate retrieved successfully',
      data: {
        candidateId: candidate._id,
        name: candidate.name,
        party: candidate.party,
        votingSession: {
          id: votingSession._id,
          name: votingSession.name
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving candidate',
      error: error.message
    });
  }
});

// GET - Get all candidates from a specific voting session
router.get('/session/:sessionId/candidates', async (req, res) => {
  try {
    const { sessionId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(sessionId)) {
      return res.status(400).json({ message: 'Invalid session ID format' });
    }

    const votingSession = await VotingSession.findById(sessionId);

    if (!votingSession) {
      return res.status(404).json({ message: 'Voting session not found' });
    }

    res.json({
      message: 'Candidates retrieved successfully',
      data: votingSession.candidates,
      count: votingSession.candidates.length,
      votingSession: {
        id: votingSession._id,
        name: votingSession.name
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving candidates',
      error: error.message
    });
  }
});

// GET - Search candidates by name (across all sessions)
router.get('/search/:name', async (req, res) => {
  try {
    const { name } = req.params;
    
    const votingSessions = await VotingSession.find({
      'candidates.name': { $regex: name, $options: 'i' }
    });

    const candidates = [];
    
    votingSessions.forEach(session => {
      session.candidates.forEach(candidate => {
        if (candidate.name.toLowerCase().includes(name.toLowerCase())) {
          candidates.push({
            candidateId: candidate._id,
            name: candidate.name,
            party: candidate.party,
            votingSession: {
              id: session._id,
              name: session.name,
              status: session.status
            }
          });
        }
      });
    });

    res.json({
      message: `Candidates with name containing '${name}' retrieved successfully`,
      data: candidates,
      count: candidates.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error searching candidates',
      error: error.message
    });
  }
});

// GET - Get all candidates from all voting sessions
router.get('/', async (req, res) => {
  try {
    const votingSessions = await VotingSession.find();
    
    const allCandidates = [];
    
    votingSessions.forEach(session => {
      session.candidates.forEach(candidate => {
        allCandidates.push({
          candidateId: candidate._id,
          name: candidate.name,
          party: candidate.party,
          votingSession: {
            id: session._id,
            name: session.name,
            status: session.status
          }
        });
      });
    });

    res.json({
      message: 'All candidates retrieved successfully',
      data: allCandidates,
      count: allCandidates.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving all candidates',
      error: error.message
    });
  }
});

module.exports = router;