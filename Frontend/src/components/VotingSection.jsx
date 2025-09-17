// src/components/VotingSection.jsx
import React, { useState } from "react";

const VotingSection = () => {
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [message, setMessage] = useState("");

  const candidates = ["Team A", "Team B", "Team C"];

  const handleVote = () => {
    if (!selectedCandidate) {
      setMessage("⚠️ Please select a candidate before voting.");
      return;
    }

    // TODO: Replace this with API call or blockchain vote submission
    setMessage(`✅ Your vote for ${selectedCandidate} has been submitted.`);
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-yellow-400 mb-4">Cast Your Vote</h2>

      <form className="space-y-3">
        {candidates.map((candidate, index) => (
          <label
            key={index}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <input
              type="radio"
              name="candidate"
              value={candidate}
              checked={selectedCandidate === candidate}
              onChange={(e) => setSelectedCandidate(e.target.value)}
              className="h-4 w-4 text-indigo-500 focus:ring-indigo-400"
            />
            <span>{candidate}</span>
          </label>
        ))}
      </form>

      <button
        onClick={handleVote}
        className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
      >
        Submit Vote
      </button>

      {message && (
        <p className="mt-4 text-center text-sm font-medium">{message}</p>
      )}
    </div>
  );
};

export default VotingSection;
