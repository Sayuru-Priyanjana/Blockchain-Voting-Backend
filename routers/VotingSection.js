const express = require('express');
const router = express.Router();
const VotingSession = require('../models/VotingSession'); 
const { v4: uuidv4 } = require('uuid'); 
const mongoose = require('mongoose');

// CREATE - Add new voting session
router.post('/sessions', async (req, res) => {
  try {
    
    if (!req.body.genesisHash) {
      req.body.genesisHash = uuidv4(); 
    }

    const votingSession = new VotingSession(req.body);
    const savedSession = await votingSession.save();

    res.status(201).json({
      message: 'Voting session created successfully',
      data: savedSession
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error creating voting session',
      error: error.message
    });
  }
});

// READ - Get all voting sessions
router.get('/sessions', async (req, res) => {
  try {
    const sessions = await VotingSession.find();
    res.json({
      message: 'Sessions retrieved successfully',
      data: sessions,
      count: sessions.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving sessions',
      error: error.message
    });
  }
});

// READ - Get single voting session by ID
router.get('/sessions/:id', async (req, res) => {
  try {
    const session = await VotingSession.findById(req.params.id);
    if (!session) {
      return res.status(404).json({
        message: 'Voting session not found'
      });
    }
    res.json({
      message: 'Session retrieved successfully',
      data: session
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving session',
      error: error.message
    });
  }
});

// UPDATE - Update voting session (candidates cannot be modified)
router.put('/sessions/:id', async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Prevent changes to 'candidates'
    if (req.body.candidates) delete req.body.candidates;

    const updatedSession = await VotingSession.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedSession) {
      return res.status(404).json({ message: 'Voting session not found' });
    }

    res.json({
      message: 'Session updated successfully (candidates cannot be changed)',
      data: updatedSession
    });
  } catch (error) {
    res.status(400).json({
      message: 'Error updating session',
      error: error.message
    });
  }
});

// DELETE - Delete voting session
router.delete('/sessions/:id', async (req, res) => {
  try {
    const deletedSession = await VotingSession.findByIdAndDelete(req.params.id);

    if (!deletedSession) {
      return res.status(404).json({ message: 'Voting session not found' });
    }

    res.json({
      message: 'Session deleted successfully',
      data: deletedSession
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting session',
      error: error.message
    });
  }
});

// GET - Get sessions by status
router.get('/sessions/status/:status', async (req, res) => {
  try {
    const sessions = await VotingSession.find({
      status: req.params.status.toLowerCase()
    });

    res.json({
      message: `Sessions with status '${req.params.status}' retrieved successfully`,
      data: sessions,
      count: sessions.length
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving sessions',
      error: error.message
    });
  }
});

module.exports = router;
