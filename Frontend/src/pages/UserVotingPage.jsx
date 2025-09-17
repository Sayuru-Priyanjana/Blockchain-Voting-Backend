import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserVotingPage = () => {
  const { chainId } = useParams();
  const navigate = useNavigate();

  const [session, setSession] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch session details by chainId
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/admin-voting/sessions");
        const sessions = res.data.data || [];
        const found = sessions.find((s) => s._id === chainId);
        setSession(found || null);
      } catch (err) {
        console.error("Error fetching session:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, [chainId]);

  const handleVote = async () => {
    if (!selectedCandidate) return alert("Please select a candidate!");

    const candidateObj = session.candidates.find(
      (c) => c.name === selectedCandidate
    );
    if (!candidateObj) return alert("Candidate not found!");

    try {
      setSubmitting(true);
      let storedUser = null;
      try {
        storedUser = JSON.parse(localStorage.getItem("user")) || null;
      } catch {
        storedUser = null;
      }

      const voterId = storedUser.data.data.user._id;

      const response = await axios.post(
        `http://localhost:5000/blocks/${chainId}/vote`,
        {
          voterId,
          candidate: candidateObj._id
        }
      );

      console.log("Vote submitted:", response.data);

      // Redirect to dashboard
      navigate(`/user/dashboard/${chainId}`);
    } catch (error) {
      console.error("Error submitting vote:", error);
      alert("Failed to submit vote. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading voting session...
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Session not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white p-8">
      <div className="bg-white/10 p-6 rounded-xl shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">{session.name}</h2>
        <p className="text-white/70 mb-6">{session.description}</p>

        <table className="w-full text-white border-collapse">
          <thead>
            <tr className="border-b border-white/30">
              <th className="py-2 text-left">Candidate</th>
              <th className="py-2 text-left">Party</th>
              <th className="py-2 text-left">Vote</th>
            </tr>
          </thead>
          <tbody>
            {session.candidates.map((c, i) => (
              <tr key={i} className="border-b border-white/20">
                <td className="py-2">{c.name}</td>
                <td className="py-2">{c.party}</td>
                <td className="py-2">
                  <input
                    type="radio"
                    name="candidate"
                    value={c.name}
                    checked={selectedCandidate === c.name}
                    onChange={(e) => setSelectedCandidate(e.target.value)}
                    className="h-4 w-4 text-indigo-500 focus:ring-indigo-400"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={handleVote}
          disabled={submitting}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 py-2 rounded-lg font-semibold transition"
        >
          {submitting ? "Submitting..." : "Submit Vote"}
        </button>
      </div>
    </div>
  );
};

export default UserVotingPage;