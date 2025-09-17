// src/pages/VotingSessions.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VotingSessions = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const res = await fetch("http://localhost:5000/admin-voting/sessions");
        const data = await res.json();
        setSessions(data.data || []);
      } catch (err) {
        console.error("Error fetching sessions:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Loading sessions...
      </div>
    );
  }

  if (!sessions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        No voting sessions available.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10">
          Available Voting Sessions 🗳
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sessions.map((session) => (
            <div
              key={session._id}
              onClick={() => navigate(`/user/dashboard/${session._id}`)}
              className="relative group bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-8 flex flex-col justify-between shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-white/30 hover:border-white/50 cursor-pointer"
            >
              <h2 className="text-2xl font-bold text-yellow-400 group-hover:text-yellow-300">
                {session.name}
              </h2>
              <p className="text-white/80 mt-2">{session.description}</p>
              <p className="text-sm text-gray-400 mt-4">
                Status:{" "}
                <span className="font-semibold text-green-400">
                  {session.status}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                {new Date(session.startTime).toLocaleString()} -{" "}
                {new Date(session.endTime).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VotingSessions;