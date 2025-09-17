import { Link } from "react-router-dom";

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-900 via-gray-900 to-black text-white p-8 flex flex-col items-center justify-start py-16 px-4">

      {/* Header */}
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-12 text-center">
        Admin Dashboard
      </h1>

      {/* Dashboard Cards / Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <Link
          to="/admin/add-voting-section"
          className="relative group bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-white/30 hover:border-white/50 cursor-pointer"
        >
          <div className="text-6xl mb-4 text-white group-hover:text-yellow-400 transition-colors duration-300">
            🗳️
          </div>
          <h2 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
            Add Voting Section
          </h2>
          <p className="text-white/80 mt-2 group-hover:text-white transition-colors duration-300">
            Create a new voting scenario with candidates and parties
          </p>
        </Link>

        <Link
          to="/admin/viewresult"
          className="relative group bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-white/30 hover:border-white/50 cursor-pointer"
        >
          <div className="text-6xl mb-4 text-white group-hover:text-green-400 transition-colors duration-300">
            📊
          </div>
          <h2 className="text-2xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
            View Results
          </h2>
          <p className="text-white/80 mt-2 group-hover:text-white transition-colors duration-300">
            Check voting results and verify blockchain ledger
          </p>
        </Link>

        <Link
          to="/admin/dashboard"
          className="relative group bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-10 flex flex-col items-center justify-center text-center shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-white/30 hover:border-white/50 cursor-pointer"
        >
          <div className="text-6xl mb-4 text-white group-hover:text-pink-400 transition-colors duration-300">
            ⚙️
          </div>
          <h2 className="text-2xl font-bold text-white group-hover:text-pink-400 transition-colors duration-300">
            Settings
          </h2>
          <p className="text-white/80 mt-2 group-hover:text-white transition-colors duration-300">
            Manage admin preferences and system settings
          </p>
        </Link>
      </div>
    </div>
  );
}

export default AdminDashboard;
