import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => setIsVisible(true), []);

  return (
 <div
  className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center text-white"
  style={{
    background: "linear-gradient(270deg, #1A2A80, #3B38A0, #7A85C1, #B2B0E8)",
    backgroundSize: "800% 800%",
    animation: "gradientMove 5s ease infinite",
  }}
    
    >
      {/* Animated Header */}
      <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4">
          Welcome to <span className="text-[#F6F7FB]">VoteChain</span>
        </h1>
      </div>

      {/* Description */}
      <div className={`transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <p className="max-w-2xl text-white/90 text-lg md:text-xl mb-8">
          A simple, transparent voting app. Every vote becomes a block linked by
          cryptographic hashes. Verify results in real-time and learn blockchain
          concepts by doing.
        </p>
      </div>

      {/* Button */}
      <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <button
          onClick={() => navigate("/login")}
          className="px-8 py-4 rounded-2xl bg-white text-[#1A2A80] font-medium shadow-lg hover:opacity-90 transition-all hover:scale-105"
        >
        Login
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-white/80 text-sm">
        <p>© {new Date().getFullYear()} VoteChain. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
