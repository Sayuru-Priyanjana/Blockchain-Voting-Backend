const User = require('../Models/Users');

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: 'success',
      results: users.length,
      data: {
        users
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single user by NIC
exports.getUserByNIC = async (req, res) => {
  try {
    const user = await User.findOne({ nic: req.params.nic });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user by NIC
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ nic: req.params.nic });
    if (!user) return res.status(404).json({ error: 'User not found' });
    
    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a voting record to a user's votingHistory by _id
exports.addVotingRecord = async (req, res) => {
  try {
    const { id } = req.params; // User _id
    const { chainId, voterAnonId } = req.body;

    if (!chainId || !voterAnonId) {
      return res.status(400).json({ status: 'fail', message: 'chainId and voterAnonId are required' });
    }

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ status: 'fail', message: 'User not found' });

    user.votingHistory.push({ chainId, voterAnonId });
    await user.save();

    res.status(200).json({
      status: 'success',
      data: {
        votingHistory: user.votingHistory
      }
    });
  } catch (err) {
    res.status(500).json({ status: 'fail', message: err.message });
  }
};
