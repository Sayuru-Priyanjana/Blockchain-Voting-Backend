import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AddVotingSection() {
  const [sectionName, setSectionName] = useState("");
  const [description, setDescription] = useState("");
  const [preferredAge, setPreferredAge] = useState("");
  const [votingStart, setVotingStart] = useState("");
  const [votingEnd, setVotingEnd] = useState("");
  const [candidateName, setCandidateName] = useState("");
  const [partyName, setPartyName] = useState("");
  const [candidates, setCandidates] = useState([]);
  const [votingSections, setVotingSections] = useState([]);

  // Edit modal
  const [isEditing, setIsEditing] = useState(false);
  const [editingSection, setEditingSection] = useState(null);

  // Fetch existing voting sessions from backend
useEffect(() => {
  const fetchSessions = async () => {
    try {
      const res = await fetch("http://localhost:5000/admin-voting/sessions");
      const data = await res.json();
      console.log("API Response:", data);

      // if your backend wraps the array in "sessions"
      setVotingSections(Array.isArray(data) ? data : data.sessions || []);
    } catch (err) {
      console.error(err);
      setVotingSections([]); // fallback
    }
  };
  fetchSessions();
}, []);


  const addCandidate = () => {
    if (!candidateName || !partyName) return;
    const newCandidate = { id: Date.now(), name: candidateName, party: partyName };
    setCandidates([...candidates, newCandidate]);
    setCandidateName("");
    setPartyName("");
  };

  const deleteCandidate = (id) => {
    setCandidates(candidates.filter(c => c.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sectionName || !votingStart || !votingEnd) return;

    const newSection = {
      name: sectionName,
      description,
      preferredAge,
      startTime: votingStart,
      endTime: votingEnd,
      candidates
    };

    try {
      const res = await fetch("http://localhost:5000/admin-voting/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSection)
      });

      if (!res.ok) throw new Error("Failed to save session");

      const savedSection = await res.json();

      if (isEditing) {
        setVotingSections(
          votingSections.map(s => s._id === editingSection._id ? savedSection : s)
        );
        setIsEditing(false);
        setEditingSection(null);
      } else {
        setVotingSections([...votingSections, savedSection]);
      }

      setSectionName("");
      setDescription("");
      setPreferredAge("");
      setVotingStart("");
      setVotingEnd("");
      setCandidates([]);
    } catch (error) {
      console.error(error);
      alert("Error saving session");
    }
  };

  const deleteSection = (id) => {
    setVotingSections(votingSections.filter(s => s._id !== id));
  };

  const openEditModal = (section) => {
    setEditingSection(section);
    setSectionName(section.name);
    setDescription(section.description);
    setPreferredAge(section.preferredAge);
    setVotingStart(section.startTime);
    setVotingEnd(section.endTime);
    setCandidates(section.candidates || []);
    setIsEditing(true);
  };

  const closeModal = () => {
    setIsEditing(false);
    setEditingSection(null);
    setSectionName("");
    setDescription("");
    setPreferredAge("");
    setVotingStart("");
    setVotingEnd("");
    setCandidates([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-gray-900 to-black text-white p-8 flex flex-col items-center py-16 px-4">
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-12 text-center">
        Add Voting Section
      </h1>

      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        {/* Left - Form */}
        <div className="w-full lg:w-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-semibold mb-2 text-white">Section Name</label>
              <input
                type="text"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                className="w-full border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/70"
                placeholder="Enter Section Name"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-white">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/70"
                placeholder="Enter Section Description"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-white">Preferred Age</label>
              <input
                type="number"
                value={preferredAge}
                onChange={(e) => setPreferredAge(e.target.value)}
                className="w-full border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-white/70"
                placeholder="Enter Minimum Age"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-2 text-white">Voting Start</label>
                <input
                  type="datetime-local"
                  value={votingStart}
                  onChange={(e) => setVotingStart(e.target.value)}
                  className="w-full border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
              <div className="flex-1">
                <label className="block font-semibold mb-2 text-white">Voting End</label>
                <input
                  type="datetime-local"
                  value={votingEnd}
                  onChange={(e) => setVotingEnd(e.target.value)}
                  className="w-full border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>
            </div>

            <hr className="border-white/30" />

            <h2 className="text-2xl font-semibold text-white mb-4">Add Candidate</h2>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Candidate Name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
                className="flex-1 border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-white/70"
              />
              <input
                type="text"
                placeholder="Party Name"
                value={partyName}
                onChange={(e) => setPartyName(e.target.value)}
                className="flex-1 border border-white/50 bg-white/10 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 placeholder-white/70"
              />
              <button
                type="button"
                onClick={addCandidate}
                className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-xl font-semibold shadow-md transition-all duration-300"
              >
                Add Candidate
              </button>
            </div>

            {candidates.length > 0 && (
              <div className="mt-4 space-y-2 border border-white/30 p-3 rounded-lg bg-white/10 backdrop-blur-md">
                <h3 className="text-white font-semibold text-lg mb-2">Candidates Added:</h3>
                {candidates.map(c => (
                  <div key={c.id} className="flex justify-between items-center border border-white/30 p-2 rounded-lg">
                    <span>{c.name} ({c.party})</span>
                    <button
                      type="button"
                      onClick={() => deleteCandidate(c.id)}
                      className="text-red-400 hover:text-red-500 font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold shadow-lg mt-6 transition-all duration-300"
            >
              {isEditing ? "Update Voting Section" : "Save Voting Section"}
            </button>

            <Link
              to="/admin"
              className="block text-center mt-4 text-white hover:text-yellow-300 transition-colors"
            >
              ← Back to Admin Dashboard
            </Link>
          </form>
        </div>

        {/* Right - Voting Sections Summary */}
        <div className="w-full lg:w-1/2 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-white">Voting Sections</h2>
          {votingSections.length === 0 ? (
            <p className="text-white/80">No voting sections added yet.</p>
          ) : (
            <ul className="space-y-4">
              {votingSections.map(section => (
                <li key={section._id} className="border border-white/30 p-4 rounded-lg bg-white/10 backdrop-blur-md">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-lg">{section.name}</span>
                    <div className="flex gap-3">
                      <button
                        onClick={() => openEditModal(section)}
                        className="text-green-400 hover:underline"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteSection(section._id)}
                        className="text-red-400 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="text-white/80 text-sm mb-1">{section.description}</div>
                  <div className="text-white/80 text-sm mb-1">Preferred Age: {section.preferredAge}</div>
                  <div className="text-white/80 text-sm mb-1">
                    Voting Time: {section.startTime} → {section.endTime}
                  </div>
                  <div className="text-white/90">
                    Candidates: {section.candidates?.map(c => `${c.name} (${c.party})`).join(", ")}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}