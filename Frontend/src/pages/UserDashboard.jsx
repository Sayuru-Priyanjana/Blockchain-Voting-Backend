// src/pages/UserDashboard.jsx
import React from "react";
import { Link, useParams } from "react-router-dom";

const UserDashboard = () => {
  const { chainId } = useParams();

  // Example static user data (later replace with real data)

 const storedUser = JSON.parse(localStorage.getItem("user")) || null;
 localStorage.setItem("chainID", chainId);

  const user = {
    name: storedUser?.data?.data?.user?.name || "Guest",
    email: storedUser?.data?.data?.user?.email || "N/A",
    role: "user",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Greeting */}
        <h1 className="text-4xl font-bold text-center mb-10">
          Welcome, <span className="text-yellow-400">{user.name}</span> 🎉
        </h1>
        <p className="text-center text-white/70 mb-12">
          You are logged in as <span className="font-semibold">{user.email}</span>
        </p>

        {/* Session info */}
        <p className="text-center text-green-400 font-semibold mb-12">
          Current Voting Session: {chainId}
        </p>

        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {/* Voting Section */}
          <Link
            to={`/user/${chainId}/voting`}
            className="relative group bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-white/30 hover:border-white/50 cursor-pointer"
          >
            <div className="text-6xl mb-4 text-white group-hover:text-yellow-400 transition-colors duration-300">
              🗳
            </div>
            <h2 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
              Voting Section
            </h2>
            <p className="text-white/80 mt-2 group-hover:text-white transition-colors duration-300">
              Cast your vote securely and quickly.
            </p>
          </Link>

          {/* View Results */}
          <Link
            to={`/admin/viewresult`}
            className="relative group bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-white/30 hover:border-white/50 cursor-pointer"
          >
            <div className="text-6xl mb-4 text-white group-hover:text-green-400 transition-colors duration-300">
              📊
            </div>
            <h2 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
              View Results
            </h2>
            <p className="text-white/80 mt-2 group-hover:text-white transition-colors duration-300">
              Check election results after voting ends.
            </p>
          </Link>

          {/* User Details */}
          <Link
            to={`/user/${chainId}/details`}
            className="relative group bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-white/30 hover:border-white/50 cursor-pointer"
          >
            <div className="text-6xl mb-4 text-white group-hover:text-pink-400 transition-colors duration-300">
              ⚙
            </div>
            <h2 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors duration-300">
              User Details
            </h2>
            <p className="text-white/80 mt-2 group-hover:text-white transition-colors duration-300">
              Manage your profile details.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;