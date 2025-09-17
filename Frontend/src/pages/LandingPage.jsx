import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white p-8">
      {/* Hero Section */}
      <h1 className="text-5xl font-extrabold text-white drop-shadow-lg mb-12 text-center">
        Welcome to VoteChain
      </h1>
      <p className="text-2xl text-white/80 mb-8 text-center">
        A secure and transparent blockchain-based voting platform.
      </p>
      <div className="flex gap-8">
        <Link
          to="/signup"
          className="relative group bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-8 text-center shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-white/30 hover:border-white/50 cursor-pointer"
        >
          <h2 className="text-3xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
            Sign Up
          </h2>
          <p className="text-white/80 mt-2 group-hover:text-white transition-colors duration-300">
            Create an account and get started with secure voting
          </p>
        </Link>

        <Link
          to="/login"
          className="relative group bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-8 text-center shadow-lg hover:scale-105 transition-transform duration-300 hover:bg-white/30 hover:border-white/50 cursor-pointer"
        >
          <h2 className="text-3xl font-bold text-white group-hover:text-green-400 transition-colors duration-300">
            Log In
          </h2>
          <p className="text-white/80 mt-2 group-hover:text-white transition-colors duration-300">
            Already have an account? Log in to vote or manage results
          </p>
        </Link>
      </div>

      

      {/* Footer */}
      <footer className="mt-16 text-center text-white/70">
        <p>© 2025 VoteChain. All rights reserved.</p>
        <div className="flex justify-center mt-4 space-x-8">
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link to="/terms" className="hover:underline">
            Terms of Service
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact Us
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;