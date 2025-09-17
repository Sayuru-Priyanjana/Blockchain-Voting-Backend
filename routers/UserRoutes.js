const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserByNIC,
  deleteUser,
  addVotingRecord
} = require('../Controllers/UserController');




// Get all users
router.get('/', getUsers);

router.post('/:id/voting-history', addVotingRecord);

// Get a single user by NIC
router.get('/:nic', getUserByNIC);

// Delete a user by NIC
router.delete('/:nic', deleteUser);



module.exports = router;