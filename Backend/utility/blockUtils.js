// blockUtils.js
const crypto = require('crypto');
const Block = require('../models/blockModel');

// Generate SHA256 hash of a block
function calculateHash(block) {
  const blockData = block.index + block.timestamp + JSON.stringify(block.voteData) + block.previousHash + block.nonce;
  return crypto.createHash('sha256').update(blockData).digest('hex');
}

// Create a new block
async function createBlock(chainId, voteData) {
  // Get last block for this chain
  const lastBlock = await Block.find({ chainId }).sort({ index: -1 }).limit(1);
  const previousHash = lastBlock.length ? lastBlock[0].hash : '0';
  const index = lastBlock.length ? lastBlock[0].index + 1 : 0;

  const newBlock = new Block({
    chainId,
    index,
    voteData,
    previousHash,
    nonce: 0
  });

  // Calculate hash
  newBlock.hash = calculateHash(newBlock);

  // Save block
  await newBlock.save();
  return newBlock;
}

// Verify chain integrity
async function verifyChain(chainId) {
  const blocks = await Block.find({ chainId }).sort({ index: 1 });
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    // Recalculate hash
    const recalculatedHash = calculateHash(block);
    if (block.hash !== recalculatedHash) return false;

    // Check previousHash
    if (i > 0 && block.previousHash !== blocks[i - 1].hash) return false;
  }
  return true;
}

// Get all blocks for a chain
async function getBlocks(chainId) {
  return await Block.find({ chainId }).sort({ index: 1 });
}

module.exports = { createBlock, verifyChain, getBlocks };
